import React from 'react'
import { Slider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTargetPressure, setCurrentManualBrew } from '../slices/currentStateSlice';
import { writeTargetPressure } from '../slices/bluetoothSlice';
import { selectCurrentTargetPresure } from '../slices/currentStateSlice';

export default function PressureSlider() {
  const dispatch = useDispatch()
  const currentTargetPressure = useSelector(selectCurrentTargetPresure)

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  const targetPressureChange = async (e) => {
    dispatch(setCurrentTargetPressure(e.target.value))
    dispatch(setCurrentManualBrew(true))
    console.log("target pressure = " + e.target.value)
    writeTargetPressure(e.target.value)
  }
  return (
    <Slider
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical',
                },
              }}
              orientation="vertical"
              value={currentTargetPressure}
              onChange={targetPressureChange}
              min={0}
              step={0.1}
              valueLabelDisplay="on"
              max={10}
              aria-label="Temperature"
              marks={[{ value: 6, label: "6 bar" }, { value: 2, label: "2 bar" }, { value: 9, label: "9 bar" }]}
              onKeyDown={preventHorizontalKeyboardNavigation}
            />
  )
}
