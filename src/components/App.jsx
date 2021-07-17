import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import useAsyncEffect from 'use-async-effect'
import ModeSwitch from './ModeSwitch'
import { RFID_READ, RFID_WRITE } from '../../rfid/constants'
import { Box, Button, Container, Grid, TextField } from '@material-ui/core'

const App = () => {
  const [writeModeEnabled, setWriteModeEnabled] = useState(false)
  const [cardID, setCardID] = useState('')
  const [cardContent, setCardContent] = useState('')
  const cardContentRef = useRef('')

  const keyPressHandler = [
    'keypress',
    (event) => {
      // TODO Replace with rfid reader
      if (event.code === 'Digit1') {
        setCardID(event.code)
        cardContentRef.current = 'dsfdsf:sddsfsdfs:sdsdfdfsrreu497rywed'
        setCardContent(cardContentRef.current)
      }
    },
  ]

  useAsyncEffect((isMounted) =>
    axios.get('http://localhost:6699/api/mode').then(
      (response) =>
        isMounted && setWriteModeEnabled(response.data === RFID_WRITE),
      (error) => console.log({ error })
    )
  )

  useEffect(() => {
    document.addEventListener(...keyPressHandler)

    return () => {
      document.removeEventListener(...keyPressHandler)
    }
  }, [])

  const onChange = ({ target }) => {
    void axios.post('http://localhost:6699/api/mode', {
      mode: target.checked ? RFID_WRITE : RFID_READ,
    })

    setWriteModeEnabled(target.checked)
    setCardContent(cardContentRef.current)
  }

  return (
    <Container maxWidth="md">
      <ModeSwitch checked={writeModeEnabled} onChange={onChange} />

      <Box>
        <TextField disabled label="Card ID" value={cardID} />
      </Box>
      <Box>
        <TextField
          disabled={!writeModeEnabled}
          value={cardContent}
          onChange={(event) => {
            setCardContent(event.target.value)
          }}
          required
          label="Data"
          size="small"
        />
      </Box>
      <Box marginTop={3}>
        <Button
          disabled={cardID === '' || !writeModeEnabled}
          variant="contained"
          color="primary"
        >
          Write
        </Button>
      </Box>
    </Container>
  )
}

export default App
