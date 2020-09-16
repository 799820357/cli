const path = require('path');
module.exports = projectInfo => {
    //返回
    return {
        filename : `js/${projectInfo.mode == 'production' ? '[name]-min' : '[name].[hash:6]'}.js`,
        path: path.join(projectInfo.dirname, 'dist', projectInfo.name),
        publicPath: ''
    };
}