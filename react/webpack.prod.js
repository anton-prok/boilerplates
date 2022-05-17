const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');

module.exports = {
    mode: 'production',
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
        contentBase: path.resolve(__dirname, './build')
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
                exclude: /node_modules/,
                options: {
                    //disable 2307 error in console:
                    "ignoreDiagnostics": [2304, 2307]
                } 
            },
            {   test: /\.js$/, enforce: "pre", loader: "source-map-loader" },
            {
                test: /\.scss$/,
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
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // set to true if you want JS source maps
                uglifyOptions: {
                    output: {
                        comments: false
                    }                    
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: { 
                    discardComments: { 
                        removeAll: true
                    }
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin('build', {}),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new CheckerPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './index.html',
            filename: 'index.html'
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