import React from 'react'
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core'

const ModeSwitch = ({ checked, onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch size="medium" checked={checked} onChange={onChange} />}
        label="RFID Write Mode"
      />
    </FormGroup>
  )
}

export default ModeSwitch
