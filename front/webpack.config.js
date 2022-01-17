const path = require('path')
const Webpack = require('webpack')
const miniExtractTextPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackRemoveEmptyScripts = require('webpack-remove-empty-scripts')
const dev = process.env.NODE_ENV === 'development'

let cssLoaders = [
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            modules: {
                localIdentName: dev ? '[local]_[hash:base64:5]' : '[hash:base64:8]'
            }
        }
    }
]

if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    require('autoprefixer')({
                        overrideBrowserslist: [
                            'last 2 versions', 'ie > 8'
                        ]
                    })
                ]
            }
        }
    })
}

cssLoaders.push({ loader: 'resolve-url-loader' })

let config = {
    entry: {
        app: [
            'react-hot-loader/patch',
            './src/sass/global/style.scss',
            './src/js/index.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@img': path.resolve('./src/images'),
            '@js': path.resolve('./src/js'),
            '@css': path.resolve('./src/sass'),
            '@fonts': path.resolve('./src/fonts'),
            'react-dom': '@hot-loader/react-dom'
        }
    },
    devtool: dev ? 'eval-cheap-module-source-map' : false,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                resolve: {
                    extensions: ['.js', '.jsx']
                },
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: dev ? 'style-loader' : miniExtractTextPlugin.loader
                    },
                    ...cssLoaders,
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: './src/sass/resources/style.scss'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: "fonts/"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "img/[name].[ext]",
                            limit: 8192
                        }
                    },
                    {
                        loader: "img-loader"
                    }
                ]
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        allowedHosts: 'all',
        historyApiFallback: true
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process_env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new WebpackRemoveEmptyScripts(),
        new miniExtractTextPlugin({ filename: "css/style.css" }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/templates/index.ejs'),
            publicPath: '/',
            minify: false
        })
    ]
}

module.exports = config