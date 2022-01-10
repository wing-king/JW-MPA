const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require("./tool/tool");
module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: { '@': resolve('src') }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader?chaheDirectory',
                    options: {
                        cacheDirectory: true
                    }
                },
                include: [resolve('src')]
            },
            {
                test: /\.(eot|svg|ttf|woff|)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'public/fonts/[name].[hash:8][ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset',
                generator: {
                    // [ext]前面自带"."
                    filename: 'public/images/[name].[hash:8][ext]',
                    publicPath: './'

                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 40 * 1024 // 4kb
                    },
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index/index.html',
            template: resolve('public/index.html'),
            title: 'index',
            hash: true,
            chunks: [`index`], // 指定引入的chunks文件名称与入口文件对应
        }),
        new VueLoaderPlugin()
    ],
    performance: {
        maxEntrypointSize: 5 * 1024 * 1024,
        maxAssetSize: 3 * 1024 * 1024,
        hints: 'warning'
    },
}