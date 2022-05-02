const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";

const config = {
    mode: isProd ? "production" : "development",
    entry: {
        index: "./src/index.tsx",
    },
    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    isProd? MiniCssExtractPlugin.loader : "style-loader",
                    {
                      loader: "css-loader",
                    //   options: {
                    //     modules: true,
                    //     importLoaders: 1,
                    //     // localIdentName: "[name]_[local]_[hash:base64]",
                    //     // sourceMap: true,
                    //     // minimize: true
                    //   }
                        options: {
                            modules: {
                                localIdentName: "[name]_[local]_[hash:base64]",
                                auto: true,
                            },
                            importLoaders: 1,
                            // localIdentName: "[name]_[local]_[hash:base64]",
                            sourceMap: true,
                        }
                    }
                  ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ],
};

if (isProd) {
    config.optimization = {
        minimizer: [new TerserWebpackPlugin()],
    };
} else {
    config.devServer = {
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        // stats: "errors-only",
        // overlay: true,
    };
}

module.exports = config;