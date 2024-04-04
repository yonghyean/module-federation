// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";

/** @type {import('webpack').Configuration} */
module.exports = (vertical) => {
  const appRoot = path.resolve(__dirname, "apps", vertical);
  const appPublic = path.resolve(appRoot, "public");
  const appSrc = path.resolve(appRoot, "src");
  const appOutput = path.resolve(appRoot, "dist");

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(appSrc, "index.ts"),
    output: {
      path: appOutput,
      clean: true,
    },
    devtool: isProduction ? false : "eval-source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@": appSrc,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(appPublic, "index.html"),
        publicPath: "/",
      }),
      // new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: ["css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: "asset",
        },
        // {
        //   test: /\.(ts|tsx|js|jsx)$/i,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: "babel-loader",
        //     options: {
        //       presets: [
        //         "@babel/preset-env",
        //         ["@babel/preset-react", { runtime: "automatic" }],
        //         "@babel/preset-typescript",
        //       ],
        //     },
        //   },
        // },
        {
          test: /\.tsx?$/,
          loader: "swc-loader",
          exclude: /node_modules/,
          options: {
            jsc: {
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
              target: "es2017",
              parser: {
                syntax: "typescript",
                jsx: true,
              },
            },
          },
        },
      ],
    },
  };
};
