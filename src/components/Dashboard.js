import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Grid from "@mui/material/Grid"
import EspressoChart from './EspressoChart.js';
import { Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateData } from '../slices/dataSlice.js';
import { setCurrentTargetPressure, setCurrentManualBrew } from '../slices/currentStateSlice.js';
import { writeTargetPressure } from '../slices/bluetoothSlice.js';
import CurrentState from './CurrentState.js';
import PressureSlider from './PressureSlider.js';


export default function Dashboard() {
  const dispatch = useDispatch()
  // const { currentTargetPressure } = useSelector((state) => state.currentState)

  // const { targetPressure, targetTime, time} = useSelector((state) => state.data)

  // const [data, setData] = useState(defaultData)




  return (
    <Grid container xs={12} justifyContent="center" direction="row" >
      <Grid container xs={11} justifyContent="center" direction="row" alignItems="flex-start" spacing={1}>

        <Grid item xs={11} sm={11} md={11} lg={11}>
          {/* <Typography variant='h4'>{title}</Typography> */}
          <EspressoChart />
        </Grid>

        <Grid item xs={1}>
          <Box sx={{ height: 400 }}>
            <PressureSlider />
          
          </Box>
        </Grid>
      </Grid>
      <CurrentState />
    </Grid>
  )
}
