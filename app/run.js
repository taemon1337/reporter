var server = require('http').createServer()
  , winston = require('winston')
  , express = require('express')
  , httpProxy = require('http-proxy')
  , proxy = httpProxy.createProxyServer({})
  , app = express()
  , port = process.env.PORT || 8080
  , env = process.env.ENV || 'dev'
  , API = process.env.API || 'http://api:8080'
  , API_KEY = process.env.API_KEY || null
  , PROXY_SECURE = process.env.PROXY_SECURE || false
  ;

winston.level = process.env.LOG_LEVEL || 'debug'

proxy = httpProxy.createProxyServer({ secure: PROXY_SECURE })

proxy.on('error', function (err) {
  winston.warn('Proxy Error: ', err)
})

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  if(API_KEY) {
    proxyReq.setHeader('apikey', API_KEY)
  }
})

app.use(express.static('web'));
app.use('/common', express.static('/common'));

app.all('/api*', function(req, res) {
  winston.info("Proxy Request: ", API + req.originalUrl)
  proxy.web(req, res, { target: API })
});

server.on('request', app);
server.listen(port, function() { console.log('Listening on ' + server.address().port) });
