const { merge } = require("webpack-merge");
const commonConfig = require("../../webpack.common");
const dotenv = require("dotenv");
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
    plugins: [
      new ModuleFederationPlugin({
        name: "remote",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
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
