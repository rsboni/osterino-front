import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TempChart from './TempChart.js'
import PressureChart from './PressureChart';
import Grid from "@mui/material/Grid"
import TimeChart from './TimeChart';
import WeightChart from './WeightChart.js';
import EspressoChart from './EspressoChart.js';


export default function Dashboard({props}) {
 const [yPressureValue, yTempValue, yWeightValue, yFlowValue, targetPressureChange, tempState, pressureState, startTime, endTime, isBrewing, targetPressure, weight ] = props

 function preventHorizontalKeyboardNavigation(event) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
  }
}

  return (
    <Grid container xs={12}>
      <Grid container xs={11}  justifyContent="center"   direction="row"   alignItems="flex-start" spacing={2}>

        <Grid item xs={11} sm={11} md={11} lg={11}>
          <EspressoChart props={[yTempValue, yWeightValue, yFlowValue, yPressureValue]} />
        </Grid>

        <Grid item xs={1}>
          <Box sx={{ height: 300 }}>
            <Slider
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical',
                },
              }}
              orientation="vertical"
              // defaultValue={9}
              value={targetPressure}
              onChange={targetPressureChange}
              min={0}
              step={0.1}
              valueLabelDisplay="on"
              max={10}
              aria-label="Temperature"
              marks={[{value: 6, label: "6 bar"},{value: 2, label: "2 bar"},{value: 9, label: "9 bar"}]}
              onKeyDown={preventHorizontalKeyboardNavigation}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid   container  justifyContent="center"   direction="row"   alignItems="flex-start" spacing={4}>
      <Grid item xs={12} sm={3} >
        <TempChart temp={tempState} />
      </Grid>
      <Grid item xs={12} sm={3} >
        <PressureChart pressure={pressureState} />
      </Grid>
      <Grid item xs={12} sm={3} >
        <TimeChart time={startTime && isBrewing ? Math.floor((new Date().getTime() - startTime) / 1000) : startTime && !isBrewing ? Math.floor((endTime - startTime)/1000) : yPressureValue[yPressureValue.length - 1][0]} max={Math.floor((new Date().getTime() - startTime) / 1000) > 60 ? Math.floor((new Date().getTime() - startTime) / 1000) : 60} />
      </Grid>
      <Grid item xs={12} sm={3} >
        <WeightChart weight={weight}/>
      </Grid>
      </Grid>
    </Grid>
  )
}
