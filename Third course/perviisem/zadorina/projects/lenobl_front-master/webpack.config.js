const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const aliasList = ["react", "react-dom", "moment", "redux", "react-redux", "redux-logger", "react-bootstrap"];
const resolveAlias = {};

const proxyTarget = {
    host: "lk.process.ifinmon.ru",
    protocol: "http:",
    port: 80
};
aliasList.forEach((alias) => {
    resolveAlias[alias] = path.resolve(path.join(__dirname, "node_modules", alias));
});

module.exports = {
    entry: ["react-hot-loader/patch", "./src/index.tsx"],
    resolve: {
        alias: { ...resolveAlias, "react-dom": "@hot-loader/react-dom" },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".less"]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/)
    ],
    module: {
        rules: [
            {
                loader: "babel-loader",
                exclude: [/node_modules/],
                test: /\.(js|jsx|ts|tsx)$/
            },
            {
                test: /\.(less|css)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: "[name].[hash:7].[ext]"
                }
            }
        ]
    },
    output: {
        filename: "[name].js",
        publicPath: "dist",
        path: path.resolve(__dirname, "dist")
    },

    mode: "development",
    // mode: 'production',

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true
                }
            }
        }
    },
    devServer: {
        stats: "errors-only",
        port: 8080,
        hot: true,
        historyApiFallback: true,
        proxy: {
            "/referencebook": {
                target: proxyTarget,
                secure: false,
                changeOrigin: true,
                logLevel: "info"
            },
            "/classifiermanager": {
                target: proxyTarget,
                secure: false,
                changeOrigin: true,
                logLevel: "info"
            },
            "/processoffice": {
                target: proxyTarget,
                secure: false,
                changeOrigin: true,
                logLevel: "info"
            },
            "/auth": {
                target: proxyTarget,
                secure: false,
                changeOrigin: true,
                logLevel: "info"
            }
        }
    }
};
