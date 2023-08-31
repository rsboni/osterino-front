import React from 'react'
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid"
import EspressoChart from './EspressoChart.js';
import CurrentState from './CurrentState.js';
import PressureSlider from './PressureSlider.js';

export default function Dashboard() {
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
