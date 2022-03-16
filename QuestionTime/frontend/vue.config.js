/*
The django-vue connection approach of which this configuration is part of was made 
popular by Ejez and EugeneDae. You can find more information about them here:
https://github.com/django-webpack/django-webpack-loader/issues/209#issue-512863855
https://github.com/EugeneDae/django-vue-cli-webpack-demo

I however decided to simplify things a little by avoiding template inheritance 
on Django's side, as this is not needed in our scenario and, I believe, in most
such cases.

Note: please remember you will also need to properly configure your Django 
backend for this setup to work as expected both in development and production.

Settings Options:
https://cli.vuejs.org/config/
https://v4.webpack.js.org/configuration/dev-server/
https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md
*/

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/static/dist/"
      : "http://127.0.0.1:8080",
  outputDir: "../static/dist",
  indexPath: "../../templates/index.html",
  pages: {
    index: {
      entry: "src/main.js",
      title: "QuestionTime",
    },
  },
  devServer: {
    devMiddleware: {
      publicPath: "http://127.0.0.1:8080",
      writeToDisk: (filePath) => filePath.endsWith("index.html"),
    },
    hot: "only",
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
