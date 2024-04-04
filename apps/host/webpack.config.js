const { merge } = require("webpack-merge");
const commonConfig = require("../../webpack.common");
const dotenv = require("dotenv");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = () => {
  const env = dotenv.config().parsed;
  if (!env.NODE_ENV) {
    env.NODE_ENV = "development";
  }
  const vertical = env.VERTICAL;
  const envConfig = require(`./webpack.${env.NODE_ENV}.js`);

  /** @type {import('webpack').Configuration} */
  const config = {
    // entry: path.resolve(__dirname, "src/index.ts"),
    plugins: [
      new ModuleFederationPlugin({
        name: vertical,
        remotes: {
          remote: "remote@http://localhost:3001/remoteEntry.js",
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
        },
      }),
    ],
  };

  const mergedConfig = merge(commonConfig(vertical), config, envConfig());
  return mergedConfig;
};
