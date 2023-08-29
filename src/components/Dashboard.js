import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// import TempChart from './TempChart.js'
// import PressureChart from './PressureChart';
import Grid from "@mui/material/Grid"
// import TimeChart from './TimeChart';
// import WeightChart from './WeightChart.js';
import EspressoChart from './EspressoChart.js';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: '80%',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  }
}));

export default function Dashboard({props}) {
 const [xValue, yPressureValue, yTempValue, yWeightValue, yFlowValue, labels, targetPressureChange, tempState, pressureState, startTime, endTime, isBrewing, targetPressure, weight ] = props

 function preventHorizontalKeyboardNavigation(event) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
  }
}

  return (
    <Grid container xs={12}>
      <Grid container xs={11}  justifyContent="center"   direction="row"   alignItems="flex-start" spacing={2}>

        <Grid item xs={11} sm={11} md={11} lg={11}>
          {/* <Typography variant='h4'>{title}</Typography> */}
          <EspressoChart props={[xValue, yTempValue, yWeightValue, yFlowValue, yPressureValue, labels]} />
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
        {/* <TempChart temp={tempState} /> */}
        <Typography><b>Temperature:</b>      
        <BorderLinearProgress variant="determinate" value={tempState/130*100} />
{tempState} ºC</Typography>
      </Grid>
      <Grid item xs={12} sm={3} >
        {/* <PressureChart pressure={pressureState} /> */}
        <Typography><b>Pressure:</b>
        <BorderLinearProgress variant="determinate" value={pressureState/15*100} />
         {pressureState} bar</Typography>

      </Grid>
      <Grid item xs={12} sm={3} >
        {/* <TimeChart time={startTime && isBrewing ? Math.floor((new Date().getTime() - startTime) / 1000) : startTime && !isBrewing ? Math.floor((endTime - startTime)/1000) : yPressureValue[yPressureValue.length - 1][0]} max={Math.floor((new Date().getTime() - startTime) / 1000) > 60 ? Math.floor((new Date().getTime() - startTime) / 1000) : 60} /> */}
        <Typography><b>Time:</b> 
        <BorderLinearProgress variant="determinate" value={(startTime && isBrewing ? Math.floor((new Date().getTime() - startTime) / 1000) : startTime && !isBrewing ? Math.floor((endTime - startTime)/1000) : yPressureValue[yPressureValue.length - 1][0])/100*100} />
        {startTime && isBrewing ? Math.floor((new Date().getTime() - startTime) / 1000) : startTime && !isBrewing ? Math.floor((endTime - startTime)/1000) : yPressureValue[yPressureValue.length - 1][0]} sec</Typography>
     
      </Grid>
      <Grid item xs={12} sm={3} >
        <Typography><b>Weigth:</b> 
        <BorderLinearProgress variant="determinate" value={weight/(weight > 50 ? weight: 50)*100} />
        
        {weight} g</Typography>

        {/* <WeightChart weight={weight}/> */}
      </Grid>
      </Grid>
    </Grid>
  )
}
