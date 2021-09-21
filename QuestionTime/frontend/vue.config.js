/*
Configuration made popular by Ejez and EugeneDae.
See:
https://github.com/django-webpack/django-webpack-loader/issues/209#issue-512863855
https://github.com/EugeneDae/django-vue-cli-webpack-demo

Settings Options:
https://cli.vuejs.org/config/
https://v4.webpack.js.org/configuration/dev-server/

Please remember you will also need to properly configure your Django backend
for this setup to work as expected both in development and production.
*/

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/static/dist/' : 'http://127.0.0.1:8080',
    outputDir: '../static/dist',
    indexPath: '../../templates/index.html',

    chainWebpack: config => {
        config.devServer
            .public('http://127.0.0.1:8080')
            .hotOnly(true)
            .headers({"Access-Control-Allow-Origin": "*"})
            .writeToDisk(filePath => filePath.endsWith('index.html'));
    }
}