import { DefinePlugin } from "webpack"

import { resolve } from "path"
import production from "./build"
import dev from "./dev"

const src = resolve(__dirname, "../", "src")
const extraConfig = process.env.NODE_ENV === "production" ? production() : dev()

import { pages, posts } from "../src/node-space-content"

const alias = {
  "@translations": resolve(src + "/translations"),
  "@src": resolve(src + "/"),
  "@components": resolve(src + "/shared/components"),
  "@lib": resolve(src + "/shared/lib"),
  "@styled": resolve(src + "/shared/theme"),
  "@config": resolve(process.cwd(), "./config.ts"),
}

const webpackConfig = {
  ...extraConfig.config,
  context: src,
  entry: [resolve(src, "index.tsx")],
  output: {
    path: resolve(__dirname, "../dist/"),
    filename: "dav3.js",
  },
  resolve: {
    alias,
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    modules: [resolve(__dirname, "../", "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg|woff|otf)$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env.DEV": true,
      "process.platform": JSON.stringify(process.platform),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "global.$content.pages": `'${JSON.stringify(pages).replace(
        /(?:\r\n|\r|\n)/g,
        "\\\\n",
      )}'`,
      "global.$content.posts": `'${JSON.stringify(posts).replace(
        /(?:\r\n|\r|\n)/g,
        "\\\\n",
      )}'`,
    }),
    ...extraConfig.plugins,
  ],
}

module.exports = webpackConfig
