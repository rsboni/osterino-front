import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
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



export default function CurrentState() {
  const { currentBrew, currentFlow, currentWeight, currentPressure, currentTemperature, currentStartTime, currentEndTime, currentTargetPressure } = useSelector((state) => state.currentState)
  const { targetPressure, targetTime, targetWeight, time} = useSelector((state) => state.data)
  
  return (
    <Grid container rowSpacing={1} justifyContent="center" direction="row" alignItems="flex-start" spacing={4}>
        <Grid item xs={12} sm={3} >
          {/* <TempChart temp={currentTemperature} /> */}
          <Typography><b>Temperature:</b>
            <BorderLinearProgress variant="determinate" value={currentTemperature / 130 * 100} />
            {currentTemperature} ºC</Typography>
        </Grid>
        <Grid item xs={12} sm={3} >
          {/* <PressureChart pressure={currentPressure} /> */}
          <Typography><b>Pressure:</b> </Typography>
            <BorderLinearProgress variant="determinate" value={currentPressure / 15 * 100} />
            <Typography>{currentPressure} bar <br /></Typography>
            <Typography variant='body2'><b>Target:</b> {currentTargetPressure} bar</Typography>

        </Grid>
        <Grid item xs={12} sm={3} >
          {/* <TimeChart time={currentcurrentStartTime && currentBrew ? Math.floor((new Date().getTime() - currentStartTime) / 1000) : currentStartTime && !currentBrew ? Math.floor((currentEndTime - currentStartTime)/1000) : data.pressure[data.pressure.length - 1][0]} max={Math.floor((new Date().getTime() - currentStartTime) / 1000) > 60 ? Math.floor((new Date().getTime() - currentStartTime) / 1000) : 60} /> */}
          <Typography><b>Time:</b></Typography>
            <BorderLinearProgress variant="determinate" value={(currentStartTime && currentBrew ? Math.floor((new Date().getTime() - currentStartTime) / 1000) : currentStartTime && !currentBrew ? Math.floor((currentEndTime - currentStartTime) / 1000) : time[time.length - 1]) / 100 * 100} />
            <Typography>{currentStartTime && currentBrew ? Math.floor((new Date().getTime() - currentStartTime) / 1000) : currentStartTime && !currentBrew ? Math.floor((currentEndTime - currentStartTime) / 1000) : 0} sec</Typography>
        </Grid>
        <Grid item xs={12} sm={3}   justifyContent="flex-end"   direction="row"
>
          <Typography><b>Weigth:</b></Typography>
            <BorderLinearProgress variant="determinate" value={currentWeight / (currentWeight > 50 ? currentWeight : 50) * 100} />

            <Typography>{currentWeight} g <br/></Typography>
            <Typography variant='body2'><b>Target:</b> {targetWeight} g</Typography>

          {/* <WeightChart currentWeight={currentWeight}/> */}
        </Grid>
      </Grid>
  )
}
