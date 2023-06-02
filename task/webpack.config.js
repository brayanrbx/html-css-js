const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const ruleForHtml = {
        test: /\.html$/i,
        use: [
            {
                loader: "html-loader",
                options: {
                    minimize: true,
                }
            }
        ]
    };

const rules = [ruleForHtml];

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    module: { rules },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new Dotenv(),
    ],
}