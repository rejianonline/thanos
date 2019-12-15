// proxy-api
const target = 'http://39.107.105.168:8889'
const target2 = 'http://39.107.105.168:8181'

module.exports = [
    {
        path: '/adminApi/',
        target: target
    },
    {
        path: '/api/',
        target: target2
    }
]
