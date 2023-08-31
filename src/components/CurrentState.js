import React from 'react'
import { Grid } from '@mui/material';
import TempChart from './TempChart'
import WeightChart from './WeightChart';
import PressureChart from './PressureChart';
import TimeChart from './TimeChart';

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
      <Grid item xs={12} sm={3} justifyContent="flex-end" direction="row">
        <WeightChart />
      </Grid>
    </Grid>
  )
}
