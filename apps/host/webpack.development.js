const path = require("path");

module.exports = () => {
  return {
    mode: "development",
    devServer: {
      open: false,
      hot: true,
      static: path.join(__dirname, "public"),
      port: 3000,
      host: "localhost",
      historyApiFallback: true,
    },
  };
};
