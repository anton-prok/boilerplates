const path = require('path');
const chalk = require('chalk');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');

module.exports = {
    entry: [require.resolve('./polyfills.js'), path.resolve(__dirname, '../src/index.js')],
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/main.[chunkhash:4].js',
        assetModuleFilename: 'assets/[name].[hash:4][ext]',
    },
    stats: 'errors-warnings',
    resolve: {
        alias: {
            '~src': path.resolve(__dirname, '../src/'),
            '~img': path.resolve(__dirname, '../src/img/'),
            '~fonts': path.resolve(__dirname, '../src/fonts/'),
            '~components': path.resolve(__dirname, '../src/components/'),
            '~styles': path.resolve(__dirname, '../src/styles/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)?$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: 'body',
        }),
        new SimpleProgressPlugin({
            progressOptions: {
                complete: chalk.bgCyan(' '),
                incomplete: chalk.bgBlack(' '),
                clear: true,
            } 
        }),
    ],
};
