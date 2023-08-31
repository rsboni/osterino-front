import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Button } from '@mui/material'
import { connectBluetooth, disconnectBluetooth } from '../slices/bluetoothSlice'

export default function BluetoothButton() {
  const dispatch = useDispatch()
  const { isConnected } = useSelector((state) => state.BLE)

  // const 

  return (
    <Grid item xs={12} sm={3}>
        {isConnected ? (
          <Button
            fullWidth
            variant='contained'
            size='large'
            className='button'
            color='primary'
            onClick={() => dispatch(disconnectBluetooth())}
            spacing={2}
          >
            DISCONNECT
          </Button>
        ) : (
          <Button
            fullWidth
            variant='contained'
            size='large'
            className='button'
            color='primary'
            onClick={() => dispatch(connectBluetooth())}
          >
            CONNECT
          </Button>
        )}
      </Grid>
  )
}
