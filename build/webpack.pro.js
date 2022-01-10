const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { resolve } = require('./tool/tool')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { join } = require('path')
module.exports = {
    mode: 'production',
    output: {
        path: join(__dirname, '../dist'), // 设置path 让celan 清理插件知道清理哪个文件
        filename: "[name]/js/[chunkhash:12].js",
        chunkFilename: '[name].[chunkhash:8].js',
        asyncChunks: true,
        // assetModuleFilename: 'images/[hash][ext][query]'
    },
    module: {
        rules: [{
            test: /\.(css|scss|sass)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                'css-loader',
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: { implementation: require('dart-sass') }
                }
            ]
        }, 　]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name]/css/[chunkhash:12].css`,
            chunkFilename: `[name]/css/[id].[chunkhash:12].css`
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: resolve('public'),
                to: join(__dirname, '../dist/public'),
                globOptions: {
                    dot: true,
                    gitignore: true,
                    // ignore: ['**/index.html*'],
                }
            }]
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            }),
            new CssMinimizerPlugin()
        ],
        // splitChunks: {
        //     cacheGroups: {
        //         vendor: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'vendors',
        //             chunks: 'all'
        //         }
        //     }
        // }
    },
}