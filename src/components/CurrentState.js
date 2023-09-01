import React from 'react'
import { Grid } from '@mui/material';
import TempChart from './LinearCharts/TempChart'
import WeightChart from './LinearCharts/WeightChart';
import PressureChart from './LinearCharts/PressureChart';
import TimeChart from './LinearCharts/TimeChart';

export default function CurrentState() {
  return (
    <Grid container rowSpacing={1} justifyContent="center" direction="row" alignItems="flex-start" spacing={4}>
      <Grid item xs={12} sm={3} >
        <TempChart />
      </Grid>
      <Grid item xs={12} sm={3} >
        <PressureChart />
      </Grid>
      <Grid item xs={12} sm={3} >
        <TimeChart />
      </Grid>
      <Grid item xs={12} sm={3} justifyContent="flex-end">
        <WeightChart />
      </Grid>
    </Grid>
  )
}
