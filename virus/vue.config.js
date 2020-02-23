module.exports = {
    devServer: {
        port: 80, //端口
        proxy: {
            '/api': {
                target: 'https://www.apiopen.top',
                // target: 'http://192.168.15.205/webService',
                // target: 'http://192.168.200.167/webService',
                changeOrigin: true, //允许websockets跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}