const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const fse = require('fs-extra')
const cwd = process.cwd();
const gitClone = require("nodegit").Clone.clone;
const { spawn } = require('child_process');
program
    .version(pkg.version)
    .command('create <dir>')
    .description('create project template')
    .action((dir,cmd) => {
        const temPath = path.join(cwd,dir);
        //判断是否存在目录
        if(!fs.existsSync(temPath)){
            fs.mkdirSync(temPath)
        }
        if(dir){
            gitClone("https://github.com/799820357/webpack-react.git",temPath).then(res => {
                let c_process = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], {
                    stdio: 'inherit',
                    cwd: temPath
                });
                c_process.on('close', function (code) {
                    console.log('子进程已退出，退出码 '+code);
                 });
            });
            // const { spawn } = require('child_process');
            // spawn('git')
            // fse.copy('./template/react/', dir, function (err) {
            //     if (err) return console.error(err); 
            //     let c_process = spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], {
            //         stdio: 'inherit',
            //         cwd: temPath
            //     });
            //     c_process.on('close', function (code) {
            //         console.log('子进程已退出，退出码 '+code);
            //      });
            //  })
        }
    })
program.parse(process.argv)

