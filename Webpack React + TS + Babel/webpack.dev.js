const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: [ 
        path.resolve(__dirname, './src/index.tsx')
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"            
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, './build'),
        quiet: true,
        historyApiFallback: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    module: {
        rules: [
            { 
                test: /\.(ts|tsx)?$/, 
                loader: "awesome-typescript-loader",
                options: {
                    //disable 2304 error in console:
                    "ignoreDiagnostics": [2304]
                } 
            },
            {   test: /\.js$/, enforce: "pre", loader: "source-map-loader" },
            {
                test: /\.(scss|css)?$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(jpe?g|jpg|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'assets/[name].[ext]'
                        } 
                    },                    
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'assets/fonts/[name].[ext]'
                        } 
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),   
        new SimpleProgressPlugin({
            progressOptions: {
                complete: chalk.bgGreen(' '),
                incomplete: chalk.bgBlack(' ')
            }  
        }),
        new FriendlyErrorsPlugin({
            clearConsole: true
        })         
    ]
}