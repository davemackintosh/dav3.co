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
    plugins: [],
  }
}
