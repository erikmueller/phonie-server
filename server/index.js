const app = require('express')()
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')

const { apiRouter } = require('./router')

app
  .use('/api', bodyParser.json(), apiRouter)
  .use(serveStatic('public'))
  .listen(6699)
