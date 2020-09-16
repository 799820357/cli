module.exports = projectInfo => {
    let result = {
        open:true,
        port: projectInfo.port || '8080',
        hot: false,
        historyApiFallback: true,
        // proxy: {
        //     '/api':{
        //         target: 'http://10.3.247.177:9050/',
        //         secure: false,  //https 的时候 使用该参数
        //         changeOrigin: true,  //是否跨域
        //         pathRewrite: {
        //             '^/api' : ''
        //         }
        //     }
        // }
    };
    return result;
};