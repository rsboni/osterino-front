import { Button, Grid } from '@mui/material'
import React from 'react'

export default function Buttons({ props }) {
  const [disconnect, onClick, setDemo, toggleBrew, device, isBrewing, demo] = props

  return (
    <Grid container justifyContent="space-around" direction="row" alignItems="center">
      <Grid item xs={12} sm={3}>
        {device ? (
          <Button
            fullWidth
            variant='contained'
            size='large'
            className='button'
            color='primary'
            onClick={() => disconnect()}
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
            onClick={() => onClick()}
          >
            CONNECT
          </Button>
        )}
      </Grid>
      <Grid item xs={12} sm={3} >
        {device ?
          <Button
            fullWidth
            variant='contained'
            size='large'
            className='button'
            color={!isBrewing ? ('success') : ('error')}
            onClick={() => toggleBrew()}

          >
            {!isBrewing ? ("BREW") : ("STOP")}
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
