

const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin'); 
const HtmlPlugin = require('html-webpack-plugin');
const os = require('os');

const threads = os.cpus().length - 1;

module.exports = {
    entry: './src/main.js',

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/main.js',
        clean: true
    },


    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.less$/,
                        use: ['style-loader', 'css-loader', 'less-loader']
                    },
                    {
                        test: /\.jpe?g$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 8 * 1024
                            },
                        },
                        generator: {
                            filename: 'images/[hash][ext][query]'
                        }
                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2)$/,
                        type: 'asset/resource',
                        generator: {
                            filename: 'media/[hash][ext][query]'
                        }
                        
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'thread-loader',
                                options: {
                                    works: threads
                                }
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    cacheDirectory: true,
                                    cacheCompression: false
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },

    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src'),
            exclude: 'node_modules',
            threads
        }),
        new HtmlPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        
    ],

    mode: 'development',

    devServer: {
        static: '../dist',
        port: 3000
    },

    devtool: 'cheap-source-map'
}