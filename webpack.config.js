const { resolve } = require('path');

const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = {
    entry: './src/index.tsx',
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CheckerPlugin(),
    ],
};

if (isProd) {
    webpackConfig.mode = 'production';
    webpackConfig.devtool = 'source-map';
} else {
    webpackConfig.mode = 'development';
    webpackConfig.devtool = 'eval-cheap-module-source-map';
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig;
