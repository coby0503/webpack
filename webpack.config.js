const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
  console.log("env", env);
  console.log("argv", argv);
  console.log("process.env", env.port);
  const port = env.port || 3000;
  return {
    // 개발환경
    mode: "development",

    // 애플리케이션 시작 경로
    entry: "./src",

    // 번들된 파일 경로
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index.[hash].js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        // jsx
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        // sass
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        // tsx
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_module/,
          use: {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
          exclude: /node_modules/,
        },
        // html
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {
                minimize: true,
              },
            },
          ],
        },
      ],
    },

    // 플러그인들
    plugins: [
      // html
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      // ts성능이 좋아진대여
      new ForkTsCheckerWebpackPlugin(),
      // css 이쁘게
      new MiniCssExtractPlugin({
        filename: "index.css",
      }),
      // .env파일 전역으로 쓸 수 있게
      new Dotenv({
        path:
          argv.mode === "development" ? ".env.development" : ".env.production",
      }),
    ],

    // 개발 서버 설정
    devServer: {
      host: "localhost",
      port: port,
      open: true,
      static: { directory: path.join(__dirname, "./dist") },
    },
  };
};
