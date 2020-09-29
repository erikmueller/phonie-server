import React, { useState } from 'react'
import axios from 'axios'
import useAsyncEffect from 'use-async-effect'
import ModeSwitch from './ModeSwitch'
import { RFID_READ, RFID_WRITE } from '../../rfid/constants'

const App = () => {
  const [writeModeEnabled, setWriteModeEnabled] = useState(false)

  useAsyncEffect((isMounted) =>
    axios.get('http://localhost:6699/api/mode').then(
      (response) =>
        isMounted && setWriteModeEnabled(response.data === RFID_WRITE),
      (error) => console.log({ error })
    )
  )

  const onChange = ({ target }) => {
    axios.post('http://localhost:6699/api/mode', {
      mode: target.checked ? RFID_WRITE : RFID_READ,
    })

    setWriteModeEnabled(target.checked)
  }

  return <ModeSwitch checked={writeModeEnabled} onChange={onChange} />
}

export default App
