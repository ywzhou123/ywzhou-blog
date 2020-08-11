---
title: webpack2config
date: 2020-08-11 19:46:06
permalink: /pages/76e999/
categories: 
  - 工具
  - webpack
tags: 
  - 
---
> Webpack.config.js 示例



```js
'use strict'; // js严格模式

var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); //将多个文件使用的常用代码块提取到一个单独文件

module.exports = {
    // 开发服务器运行工具 webpack-dev-server --devtool 调用
    devtool: 'eval-source-map', 

    // 入口文件
    entry: {
        main: './src/entry.jsx', //唯一入口文件
        vendor: ['react']
    },

    // 输出文件
    output: {
        path: './build', //打包后的文件存放的地方
        filename: 'main.js', //打包后输出文件的文件名
        // publicPath: 'http://localhost:8888/build/' //启动本地服务后的根目录
    },

    // 加载器
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loader: "jsx!babel", include: /src/ , exclude: /node_modules/,  }, // 加载js或jsx文件，并指定包含目录和排除目录
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss") }, // 加载CSS文件
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass") }, // 加载SCSS文件
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=819200' } // 加载图片，并限制大小
        ]
    },

    // 解析ES6语法
    babel: {
        presets: ['es2015', 'stage-0', 'react'], 
        plugins: [
            'transform-runtime', [
                'import', {
                    libraryName: 'antd',
                    style: 'css'
                }
            ]
        ]
    },

    postcss: [
        require('autoprefixer') //调用autoprefixer插件,css3自动补全
    ],

    // 开发服务器 
    // 通过执行 webpack-dev-server --devtool --progress 启动
    // devServer: {
    //     // contentBase: './src/views'    //本地服务器所加载的页面所在的目录
    //     port: 8888,                      //端口号
    //     colors: true,                    //终端中输出结果为彩色
    //     historyApiFallback: true,        //不跳转
    //     inline: true                     //实时刷新
    // },

    plugins: [
        new ExtractTextPlugin('main.css'),
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        })
    ],

    // 设置可以解析的文件格式
    resolve: {
        alias: {},
        extensions: ['', '.jsx', '.json', '.js']
    },

}
```

