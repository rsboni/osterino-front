import { Button, Grid } from '@mui/material'
import React from 'react'

export default function Buttons({ props }) {
  const [disconnect, onClick, setDemo, toggleBrew, device, isBrewing, demo] = props

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        {device ? (
          <Button
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
            variant='contained'
            size='large'
            className='button'
            color='primary'
            onClick={onClick}
          >
            CONNECT
          </Button>
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        {device ?
          <Button
            variant='contained'
            size='large'
            className='button'
            color={!isBrewing ? ('success') : ('error')}
            onClick={toggleBrew}

          >
            {!isBrewing ? ("BREW") : ("STOP")}
          </Button>
          : <Button
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
