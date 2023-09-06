import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { writeTargetTemperature } from '../slices/bluetoothSlice';
import { Typography } from '@mui/material';
import { selectCurrentPressure, selectCurrentTemperature, selectCurrentTargetTemperature } from '../slices/currentStateSlice';
import {Button} from '@mui/material';
import {setCurrentTargetTemperature } from '../slices/currentStateSlice'

export default function Steam() {
  const temperature = useSelector(selectCurrentTemperature);
  const targetTemperature = useSelector(selectCurrentTargetTemperature);
  const pressure = useSelector(selectCurrentPressure)
  const dispatch = useDispatch();
  const [isSteaming, setIsSteaming] = useState(false);

  const toogleStream = () => {
    if (isSteaming) {
      setIsSteaming(false)
      dispatch(setCurrentTargetTemperature(104))
      dispatch(writeTargetTemperature(104))
    }
    else {
      setIsSteaming(true)
      dispatch(setCurrentTargetTemperature(104))
      dispatch(writeTargetTemperature(135))
    }
  }

  return (
    <>
    <Typography>Temperature: {temperature} ºC</Typography>
    <Typography>Target: {targetTemperature} ºC</Typography>
    <Typography>Pressure: {pressure} bar</Typography>
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
