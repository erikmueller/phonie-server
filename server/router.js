const { Router } = require('express')
const { state } = require('./store')
const { RFID_READ, RFID_WRITE } = require('../rfid/constants')

const apiRouter = Router()

apiRouter.get('/mode', (req, res) => {
  res.json(state.rfidMode)
})

apiRouter.post('/mode', (req, res) => {
  const { mode } = req.body

  if (mode === RFID_READ || mode === RFID_WRITE) {
    state.rfidMode = mode
    res.status(202)
  } else {
    console.error(`Not setting unreckognized rfid mode: ${mode}.`)
    res.status(400)
  }

  res.end()
})

module.exports = { apiRouter }
