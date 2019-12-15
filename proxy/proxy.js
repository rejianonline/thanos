var api = require('./api')

// 可以修改请求内容
const onProxyReq = proxyReq => {}
module.exports = api.reduce((result, curr) => {
    result[curr.path] = {
        target: curr.target,
        onProxyReq,
        changeOrigin: true,
        pathRewrite: {
            [`^${curr.path}`]: ''
        }
    }
    return result
}, {})