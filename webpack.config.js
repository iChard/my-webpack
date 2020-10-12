const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const MyPlugin = require('./plugins/MyPlugin')

const devTools = ['', 'eval', 'source-map', 'eval-source-map', 'cheap-eval-source-map', 'cheap-module-eval-source-map']

module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        app: './src/index.js',
        another: './src/entry2.js',
        // lodash: ['lodash']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: '[name].[hash:6].js',
        filename: '[name].js',
        // filename: '[name].[chunkhash:6].js',
        // publicPath: 'https://cdn.example.com/assets/'
        // publicPath: './assets/',
        libraryTarget: 'umd',//"var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
        // library: 'MyLibrary',
        // pathinfo: true,
        // libraryTarget: 'var'

    },
    devtool: devTools[0],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 9000,
        clientLogLevel: 'none',
        // filename: 'app.js',
        // lazy: true,
        headers: {
            'X-Custom-Foo': 'bar'
        },
        historyApiFallback: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        open: true,
        proxy: {
            '/api': "https://localhost:3000",
            pathRewrite: { '^/api': '' },
            secure: false
        }
    },
    context: path.resolve(__dirname, ''),
    module: {//loader
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, 'cache-loader'],
                sideEffects: true
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', title: 'Code Spliting' }),
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin(),
        new MyPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'src/utils/')
        },
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'],
        // extensions: ['.js','.json'],
    },
    externals: {
        // lodash: '_',
        // lodash: {
        //     root: '_',
        //     // var: 'lodash',
        //     commonjs: 'lodash',
        //     commonjs2: 'lodash',
        //     umd: 'lodash',
        // }
    },
    performance: {
        maxEntrypointSize: 2000000,
        hints: 'warning',
        maxAssetSize: 7000000,// 资源最大限制
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.png') || assetFilename.endsWith('.js')
        }
    }
}

