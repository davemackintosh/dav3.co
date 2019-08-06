export default function buildTools() {
  return {
    config: {
      devtool: "none",
      mode: "production",
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
