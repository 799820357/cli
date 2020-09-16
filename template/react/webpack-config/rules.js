const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = projectInfo => {
    return [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
              {
                  loader: 'babel-loader?cacheDirectory',
              },
              {
                  loader: 'thread-loader',
                  options: {
                      workers: 4
                  }
              }
          ],
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,//抽离css
                }, 
                {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, 
                {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                },
                {
                  loader: 'postcss-loader' //浏览器前缀补充
                }
            ]
        },
        { 
            test:/\.(gif|png|jpg|woff|svg|ttf|eot)$/,//图片的处理
            use:[
              { 
                loader:'url-loader', 
                options: { 
                  limit:1,//当图片大于这个值他会生成一个图片的url 如果是一个小于的他会生成一个base64的图片在js里展示
                  outputPath: 'images/',// 指定打包后的图片位置
                  //name:'[path][name].[ext]
                  name: res => {
                    return res.split('images\\')[1].replace(/\\/g,'/');
                  },
                  publicPath:'../images'
                }
              }
            ]
        }
    ];
}