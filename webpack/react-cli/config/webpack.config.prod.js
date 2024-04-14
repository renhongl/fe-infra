const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[name].[contenthash:10].js",
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js",
    assetModuleFilename: "static/media/[hash:10]/[ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
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
            test: /\.jsx?$/,
            include: path.resolve(__dirname, "../src"),
            use: {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                cacheCompression: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10]j.chunk.css",
    }),
    new CssMinimizerWebpackPlugin(),
    new TerserWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "chunk-react",
          priority: 40,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  mode: "production",
};
