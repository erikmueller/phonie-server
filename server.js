const app = require('express')()
const serveStatic = require('serve-static')

const { apiRouter } = require('./router')

app
  .use('/api', apiRouter)
  .use('/*', serveStatic('public'))
  .listen(6699)
