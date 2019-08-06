import {
  DefinePlugin,
  NamedModulesPlugin,
} from "webpack"

import { resolve } from "path"
const src = resolve(__dirname, "../", "src")

import {
  pages,
  posts,
} from "../src/node-space-content"

const alias = {
  "@translations": resolve(src + "/translations"),
  "@src": resolve(src + "/"),
  "@components": resolve(src + "/shared/components"),
  "@lib": resolve(src + "/shared/lib"),
  "@less": resolve(src + "/shared/less"),
}

const webpackConfig = {
  context: src,
  entry: [
    resolve(src, "index.tsx"),
  ],
  output: {
    path: resolve(__dirname, "../dist/"),
    filename: "dav3.js",
  },
  devtool: "cheap-module-source-map",
  watch: process.env.NODE_ENV !== "production" && !process.env.NO_WEBPACK_WATCH,
  mode: process.env.NODE_ENV || "development",
  resolve: {
    alias,
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less", ".json"],
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
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "global.$content.pages": `'${JSON.stringify(pages).replace(/(?:\r\n|\r|\n)/g, "\\\\n")}'`,
      "global.$content.posts": `'${JSON.stringify(posts).replace(/(?:\r\n|\r|\n)/g, "\\\\n")}'`,
    }),
  ],
}

module.exports = webpackConfig
