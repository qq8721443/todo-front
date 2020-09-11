const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target:'https://nayoung-todo-backend.herokuapp.com',
            changeOrigin:true
        })
    )
}