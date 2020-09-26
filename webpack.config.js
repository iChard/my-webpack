const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        app: './src/index.js',
        entry2: './src/entry2.js',
        vendor: ['lodash']
    },
    output: {
        path: path.resolve(__dirname, 'dist', '[hash:5]'),
        filename: '[name].bundle.js',
        publicPath: 'http://cdn.example.com/assets/[hash]/'
    },
    mode: 'development',
    // devtool: 'source-map',
    devtool: '',
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: false,
    //     port: 9000
    // },
    module: {//loader
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
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

