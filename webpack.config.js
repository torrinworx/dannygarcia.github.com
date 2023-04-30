const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    mode: "development",
    entry: "./src/main.ts",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        fallback: { fs: false },
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' },
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: 'raw-loader',
            },
        ]
    },
    plugins: [
        HTMLWebpackPluginConfig,
        new CopyWebpackPlugin({
            patterns: [
                { from: 'favicon.ico', to: 'favicon.ico' },
            ],
        }),
    ],
    devServer: {
        host: '0.0.0.0',
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, 'src'),
            watch: true,
        },
    },
};
