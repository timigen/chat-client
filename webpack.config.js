﻿const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var entry = {
    'chat-client': './src/ts/index.ts'
}

module.exports = {
    mode: "development",
    entry: entry,
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
      }
        ]
    },
    plugins: [ 
        new ExtractTextPlugin(
            {filename: 'style/style.css'}
          )
    ]
};