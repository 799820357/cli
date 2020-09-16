const path = require('path');
//将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//css压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//html模版构建
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清理打包目录内文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//css雪碧图
const CssSpriteImage = require('roi-css-sprite');
//
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = projectInfo => {
    let result = [
        new CleanWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: `css/${projectInfo.mode == 'production' ? '[name]-min' : '[name].[hash:6]'}.css`
        }),
        
        //压缩css
        new OptimizeCSSAssetsPlugin,
        //html
        new HtmlWebpackPlugin({
            //文件名称
            filename: 'index.html',
            //防止循环引用
            chunksSortMode: 'none',
            // 指定生成的html文件依赖的模板
            template: path.join(projectInfo.dirname, 'src', projectInfo.name, 'app.html'),
        }),
        // new BundleAnalyzerPlugin
    ];
    //生产模式
    if(projectInfo.mode == 'production'){
        result.push(
            //css雪碧图
            new CssSpriteImage({
                cssPath : path.join(projectInfo.dirname, 'dist', projectInfo.name,'css'),
                matchReg:{
                    pattern:"\.\.\/images\/sprite\/"
                },
                spritesmithOptions : {
                    algorithm : 'top-down'//'left-right'
                }
            })
        );
    };
    return result;
}