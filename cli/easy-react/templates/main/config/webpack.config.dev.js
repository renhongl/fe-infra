const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10]/[ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.(jpe?g|png|git|webp|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024,
              },
            },
          },
          {
            test: /\.(woff2?|tff)$/,
            type: "asset/resource",
          },
          {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
    }),
    new ReactRefreshWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "main",
      remotes: {
        demo1: "demo1@http://localhost:3001/demo1.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    static: "./dist",
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  performance: false,
};
