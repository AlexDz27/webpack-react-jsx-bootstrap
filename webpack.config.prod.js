const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob-all');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

// Paths that will be checked by plugin that deletes unnecessary CSS
const PURGE_PATHS = {
    resources: path.join(__dirname, 'resources') + '/**/*',
    indexHtml: path.join(__dirname, 'public', 'index.html')
};

module.exports = {
    mode: 'production',
    entry: './resources/webpack.entry.js',
    output: {
        path: path.resolve('./public'),
        filename: 'js/index.min.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.min.css'
        }),
        new PurgeCSSPlugin({
            paths: glob.sync([PURGE_PATHS.resources, PURGE_PATHS.indexHtml], { nodir: true })
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.(scss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ]
    },
    resolve: { extensions: ['.js', '.jsx'] } // enable imports without writing .js/.jsx file extensions
};