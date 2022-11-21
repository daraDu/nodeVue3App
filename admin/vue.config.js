
module.exports = {
    // 开启代理服务器方式2
    devServer: {
        proxy: {
            '/api': { //'/api' 请求前缀 只查找请求前缀开始的
                target: 'http://localhost:8080',
                pathRewrite: {'^/api': ''}, // 重写路径, 将所有的/api都变为''
                ws: true,//用于支持websocket
                changeOrigin: true // 用于控制请求中的值，将值变为服务器的值，跨域伪造，false不伪造 true 伪造， 一般为true 默认为true
            }
        }
    }
}