import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setCurrentStartTime, newData, setCurrentBrew, selectCurrentBrew } from '../slices/currentStateSlice'
import BluetoothButton from './BluetoothButton'
import { toggleBrew } from '../slices/bluetoothSlice'

export function Buttons() {
  const dispatch = useDispatch()
  const [demo, setDemo] = useState(false)
  const currentBrew = useSelector(selectCurrentBrew)
  const {isConnected} = useSelector(state => state.BLE)
  
  return (
    <Grid container justifyContent="space-around" direction="row" alignItems="center">
      <BluetoothButton />
      <Grid item xs={12} sm={3} >
        {isConnected ?
          <Button
            fullWidth
            variant='contained'
            size='large'
            className='button'
            color={!currentBrew ? ('success') : ('error')}
            onClick={() => dispatch(toggleBrew())}

          >
            {!currentBrew ? ("BREW") : ("STOP")}
          </Button>
          : <Button
            fullWidth
            variant='contained'
            size='large'
            className='button'
            color='secondary'
            onClick={() => setDemo(!demo)}
            spacing={2}
          >
            {!demo ? "DEMO" : "STOP DEMO"}
          </Button>
        }
      </Grid>
    </Grid>
  )
}

export default React.memo(Buttons)