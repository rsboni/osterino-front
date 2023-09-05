import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { writeTargetTemperature } from '../slices/bluetoothSlice';
import { Typography } from '@mui/material';
import { selectCurrentTemperature } from '../slices/currentStateSlice';
import {Button} from '@mui/material';

export default function Steam() {
  const temperature = useSelector(selectCurrentTemperature);
  const dispatch = useDispatch();
  const [isSteaming, setIsSteaming] = useState(false);

  const toogleStream = () => {
    if (isSteaming) {
      setIsSteaming(false)
      dispatch(writeTargetTemperature(104))
    }
    else {
      setIsSteaming(true)
      dispatch(writeTargetTemperature(135))
    }
  }

  return (
    <>
    <Typography>Temperature: {temperature}</Typography>
    <Button
    fullWidth
    variant='contained'
    size='large'
    className='button'
    color={!isSteaming ? ('success') : ('error')}
    onClick={() => toogleStream()}
  >
    {!isSteaming ? ("START") : ("STOP")}
  </Button>
  </>
  )
}
