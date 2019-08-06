import {
  DefinePlugin,
  NamedModulesPlugin,
} from "webpack"

import { resolve } from "path"
import production from "./build"
import dev from "./dev"

const src = resolve(__dirname, "../", "src")
const extraConfig = process.env.NODE_ENV === "production"
  ? production()
  : dev()

console.log("SRC PATH %s", src)

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
  ...extraConfig.config,
  context: src,
  entry: [
    resolve(src, "index.tsx"),
  ],
  output: {
    path: resolve(__dirname, "../dist/"),
    filename: "dav3.js",
  },
  resolve: {
    alias,
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less", ".json"],
    modules: [
      resolve(__dirname, "../", "src"),
      "node_modules",
    ],
  },
  module: {
    rules: [
      ...extraConfig.rules,
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
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
    ...extraConfig.plugins,
  ],
}

module.exports = webpackConfig
