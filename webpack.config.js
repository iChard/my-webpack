const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
module.exports = {
    entry: {
        app: './src/index.js',
        entry2: './src/entry2.js',
        lodash: ['lodash']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].[hash:6].js',
        filename: '[name].[hash:6].js',
        // filename: '[name].[chunkhash:6].js',
        // publicPath: 'https://cdn.example.com/assets/'
        // publicPath: './assets/',
        // libraryTarget: 'amd'
    },
    mode: 'development',
    devtool: 'source-map',
    devtool: '',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 9000
    },
    module: {//loader
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }]//
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    }
}

