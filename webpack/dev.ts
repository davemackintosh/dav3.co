export default function devTools() {
  return {
    config: {
      devtool: "cheap-module-source-map",
      devServer: {
        historyApiFallback: true,
      },
      watch: true,
      mode: "development",
    },
    rules: [
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
    ],
    plugins: [],
  }
}
