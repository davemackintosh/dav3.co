import {
  DefinePlugin,
  NamedModulesPlugin,
} from "webpack"

import {resolve} from "path"
const src = resolve(__dirname, "../", "src")
const cwd = process.cwd()

import {
  pages,
  posts,
} from "../src/node-space-content"

const alias = {
  "@translations": resolve(src + "/translations"),
  "@flow": resolve(cwd + "/flow/declarations"),
  "@src": resolve(src + "/"),
  "@components": resolve(src + "/shared/components"),
  "@lib": resolve(src + "/shared/lib"),
  "@less": resolve(src + "/shared/less"),
}

const webpackConfig = {
  context: src,
  entry: [
    resolve(src, "index.ts"),
  ],
  output: {
    path: resolve(__dirname, "../dist/"),
    filename: "nw.js",
  },
  devtool: "cheap-module-source-map",
  watch: process.env.NODE_ENV !== "production" && !process.env.NO_WEBPACK_WATCH,
  mode: process.env.NODE_ENV || "development",
  resolve: {
    alias,
    modules: [
      resolve(__dirname, "../", "src"),
      "node_modules",
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|less)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              noIeCompat: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg|woff|otf)$/,
        loaders: ["file-loader"],
      },
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new DefinePlugin({
      "process.platform": JSON.stringify(process.platform),
      "$content.pages": `'${JSON.stringify(pages).replace(/(?:\r\n|\r|\n)/g, "\\\\n")}'`,
      "$content.posts": `'${JSON.stringify(posts).replace(/(?:\r\n|\r|\n)/g, "\\\\n")}'`,
    }),
  ],
}

module.exports = webpackConfig
