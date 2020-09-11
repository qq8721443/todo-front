const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api',{
            target:'https://nayoung-todo-backend.herokuapp.com',
            changeOrigin:true
        })
    )
}