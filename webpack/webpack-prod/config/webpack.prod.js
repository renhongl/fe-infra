

const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin'); 
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');

const threads = os.cpus().length - 1;

function getStyleLoader (prev) {
    return [MiniCssExtractPlugin.loader, 'css-loader', {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
              ],
            ],
          },
        },
      }, prev].filter(Boolean);
}


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
                        use: getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoader('less-loader')
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
                        loader: 'babel-loader',
                    }
                ]
            }
        ]
    },

    plugins: [
        new ESLintPlugin({
            context: path.resolve(__dirname, '../src')
        }),
        new HtmlPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: './css/main.css'
        }),
        new CssMinimizerPlugin(),
        new TerserPlugin({
            parallel: threads
        })
    ],

    mode: 'production',

   
}