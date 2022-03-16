const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  publicPath: "http://127.0.0.1:8080/",
  outputDir: "./dist/",

  chainWebpack: (config) => {
    config
      .plugin("BundleTracker")
      .use(BundleTracker, [{ filename: "./webpack-stats.json" }]);

    config.output.filename("bundle.js");
    config.optimization.splitChunks(false);
    config.resolve.alias.set("__STATIC__", "static");
  },

  devServer: {
    devMiddleware: {
      publicPath: "http://127.0.0.1:8080",
    },
    hot: "only",
    headers: { "Access-Control-Allow-Origin": "*" },
  },

//   uncomment before executing 'npm run build' if you wish to have a separate .css file
//   css: {
//       extract: {
//         filename: 'bundle.css',
//         chunkFilename: 'bundle.css',
//       },
//   }
};
