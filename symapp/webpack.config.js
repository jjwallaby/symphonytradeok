var path = require("path"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        controller: path.resolve(__dirname, "./src/javascript/controller.js"),
        app: path.resolve(__dirname, "./src/javascript/app.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loaders: ['babel-loader'],
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            {
              test: /\.(woff|woff2)$/,
              loader: 'url-loader',
              options: {
                prefix: 'font/',
                limit: '5000000',
              },
            },
            {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              options: {
                limit: 1000000,
                mimetype: 'application/octet-stream',
              },
            },
            {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader',
              options: {
                limit: '1000000',
                mimetype: 'image/svg+xml',
              },
            },
          ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "controller.html",
            template: "./src/html/controller.html",
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: "app.html",
            template: "./src/html/app.html",
            inject: false
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4000,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
};
