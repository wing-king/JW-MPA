const path = require("path");
const webpack = require("webpack");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const { resolve } = require("./tool/tool");
module.exports = {
    mode: 'development',
    stats: 'errors-only',
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[chunkhash].js',
        clean: true
    },
    devServer: {
        // http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问
        historyApiFallback: true,
        hot: true,
        client: {
            overlay: false,
            logging: "none",
            progress: true,
        },
        compress: true,
        host: "localhost",
        port: "3000",
    },
    module: {
        rules: [{
            test: /\.(css|scss|sass)$/,
            use: [
                "style-loader",
                "css-loader",
                "postcss-loader",
                {
                    loader: "sass-loader",
                    options: { implementation: require("dart-sass") },
                },
            ],
        }, ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            clearConsole: true
        })
    ],
};