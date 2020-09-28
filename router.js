
const { Router } = require('express')
const { state, RFID_READ, RFID_WRITE } = require('./store')

const apiRouter = Router()

apiRouter.get('/set/:mode', (req, res) => {
  const { mode } = req.params

  if (mode === RFID_READ || mode === RFID_WRITE) {
    state.rfidMode = req.params.mode
    res.status(202)
  } else {
    console.error(`Not setting unreckognized rfid mode: ${mode}.`)
    res.status(502)
  }

  res.end()
})

module.exports = { apiRouter }
