const path = require('path');
//项目信息
let projectInfo = (params => {
    let result = {
        dirname: path.resolve(__dirname)
    };
    params.split(',').forEach(item => {
        item = item.split(':');
        result[item[0]] = item[1];
    });
    return result;
})(process.env.NODE_ENV);
//entry
const entry = require('./webpack-config/entry');
//output
const output = require('./webpack-config/output');
//loaders
const rules = require('./webpack-config/rules');
//resolve
const resolve = require('./webpack-config/resolve');
//plugins
const plugins = require('./webpack-config/plugins');
//optimization
const optimization = require('./webpack-config/optimization');
//devServer
const devServer = require('./webpack-config/devServer');
//config
let config = {
    mode: projectInfo.mode,
    entry: entry(projectInfo),
    output: output(projectInfo),
    plugins: plugins(projectInfo),
    module: {
        rules: rules(projectInfo)
    },
    resolve: resolve(projectInfo),
    optimization: optimization(projectInfo),
    devServer: devServer(projectInfo),
    devtool: projectInfo.mode == 'production' ? false : 'cheap-module-eval-source-map'
};


module.exports = config;
