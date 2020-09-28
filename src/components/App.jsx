import React from 'react'
import axios from 'axios'
import ModeSwitch from './ModeSwitch'
import { RFID_READ, RFID_WRITE } from '../../rfid/constants'

const loadData = (setWriteModeEnabled) => {
  axios.get('http://localhost:6699/api/mode').then(
    (response) => {
      setWriteModeEnabled(response.data === RFID_WRITE)
    },
    (error) => {
      console.log({ error })
    }
  )
}

const App = () => {
  const [writeModeEnabled, setWriteModeEnabled] = React.useState(false)

  React.useEffect(() => loadData(setWriteModeEnabled))

  const onChange = ({ target }) => {
    axios.post('http://localhost:6699/api/mode', {
      mode: target.checked ? RFID_WRITE : RFID_READ,
    })

    setWriteModeEnabled(target.checked)
  }

  return <ModeSwitch checked={writeModeEnabled} onChange={onChange} />
}

export default App
