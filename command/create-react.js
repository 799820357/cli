const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const cwd = process.cwd();
const gitClone = require("nodegit").Clone.clone;
const { spawn } = require('child_process');
const urlencode = require('urlencode');
const ora = require('ora');
const symbols = require('log-symbols');
const { Console } = require('console');
//选择获取类型
let getProjectType = () => {
    let typeList = [
        {
            type: 'list',
            message: '请选择需要（多/单）项目脚手架？',
            name: 'type',
            choices: ['mutil', 'single'],
            filter: function(val) {
                return val.toLowerCase()
            }
        }
    ];
    return inquirer.prompt(typeList)
};
//检测单项目
const checkSingle = (type,temPath) => {
    return new Promise((resolve,reject) => {
        try{
            if(type == 'single'){
                let wpcUrl = path.join(temPath,'setting','single','webpack-config');
                //package处理
                let pkgData = JSON.parse(fs.readFileSync(path.join(temPath,'package.json'),'utf-8'));
                pkgData['scripts'] = {
                    "dev": "cross-env NODE_ENV=mode:development webpack-dev-server",
                    "pro": "cross-env NODE_ENV=mode:production webpack"
                };
                pkgData = JSON.stringify(pkgData,null,4);
                fs.writeFile(path.join(temPath,'package.json'), pkgData, 'utf-8',function(err){
                    if(err)console.log('写文件出错了，错误是：'+err);
                });
                //webpack-config处理
                let wpconfigFiles = fs.readdirSync(path.join(temPath,'setting','single','webpack-config'));
                if(wpconfigFiles.length){
                    wpconfigFiles.forEach(name => {
                        let data = fs.readFileSync(path.join(wpcUrl,name),'utf-8');
                        fs.writeFile(path.join(temPath,'webpack-config',name), data, 'utf-8',function(err){
                            if(err)console.log('写文件出错了，错误是：'+err);
                        });
                    })
                };
                //拷贝文件
                fse.copySync(path.join(temPath,'src','test'),path.join(temPath,'src'));
                fse.removeSync(path.join(temPath,'src','test')); 
            }
            //删除多余文件夹
            fse.removeSync(path.join(temPath,'setting'));
            resolve();
        }catch(e){
            reject(e);
        }
    });
};
let pullGit = (gitPath,isMove) => {
    return new Promise((resolve,reject) => {
        let orgPath = gitPath;
        if(isMove){
            gitPath = path.join(gitPath,`temp${+ new Date}`);
            fse.mkdirSync(gitPath);
        }
        gitClone("https://github.com/799820357/webpack-react.git",gitPath).then(res => {
            //删除git文件
            fse.removeSync(path.join(gitPath,'.git'));
            //是否需要移动文件夹
            if(isMove){
                //拷贝文件
                fse.copySync(gitPath,orgPath);
                //删除git文件
                fse.removeSync(gitPath);
            }
            resolve();
        },err => {
            reject();
        });
    })
}
//命令
module.exports = (program) => {
    //program
    program.command('create-react [dir]')
        .action((dir,cmd) => {
            dir = dir || '';
            const temPath = path.join(cwd,dir);
            //判断是否存在目录
            if(!fse.existsSync(temPath)){
                fse.mkdirSync(temPath)
            }else{
                // fse.emptydirSync(temPath)
            }
            console.log(chalk.green(`欢迎使用create-react cli`));
            getProjectType().then(res => {
                const type = res.type;
                const cliProgress = ora(`项目正在创建, 请等待...`);
                cliProgress.start();
                pullGit(temPath,!!!dir).then(res => {
                    //检测单项目
                    checkSingle(type,temPath).then(() => {
                        let c_process = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], {
                            stdio: 'inherit',
                            cwd: temPath
                        });
                        c_process.on('close', function (code) {
                            cliProgress.succeed(chalk.green('react项目构建完成，祝开心每一天~~~'));
                        });
                    });
                },err => {
                    cliProgress.fail();
                    console.log(symbols.error, chalk.red(err))
                });
            });
        });
}