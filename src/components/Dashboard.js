import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TempChart from './TempChart.js'
import PressureChart from './PressureChart';
import Chart from 'react-apexcharts';
import Grid from "@mui/material/Grid"
import TimeChart from './TimeChart';

export default function Dashboard({props}) {
 const [yPressureValue, yTempValue, targetPressureChange, tempState, pressureState, startTime, isBrewing ] = props

 function preventHorizontalKeyboardNavigation(event) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
  }
}

  return (
    <Grid container xs={12}>
      <Grid container xs={11}  justifyContent="center"   direction="row"   alignItems="flex-start" spacing={2}>

        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Chart
            options={
              {
                chart: {
                  id: 'realtime',
                  offsetX: 0,
                  height: 350,
                  type: 'line',
                  animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                      speed: 200
                    }
                  },
                  toolbar: {
                    show: false
                  },
                  zoom: {
                    enabled: false
                  }
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'smooth'
                },
                title: {
                  show: false
                },
                markers: {
                  size: 0
                },
                xaxis: {
                  type: 'numeric',
                  // range: yTempValue.length,
                },
                yaxis: [
                  {
                    title: {
                      text: 'Pressure',
                    },
                    max: 10,
                    min: 0
                  },
                  {
                    opposite: true,
                    title: {
                      text: 'Temperature',
                    },
                    max: 130,
                    min: 70
                  },

                ],

                legend: {
                  show: true,

                },
                tooltip: {
                  shared: true,
                  intersect: false,
                }
              }
            }
            series={[{
              name: 'Pressure',
              type: 'area',
              data: yPressureValue
            },
            {
              name: 'Temperature',
              type: 'line',
              data: yTempValue,
              color: '#cf2539'
            }]}

            height="300px"
          />
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
              defaultValue={9}
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
      <Grid   container xs={11}  justifyContent="center"   direction="row"   alignItems="flex-start" spacing={4}>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <TempChart temp={tempState} />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <PressureChart pressure={pressureState} />
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <TimeChart time={startTime && isBrewing ? Math.floor((new Date().getTime() - startTime) / 1000) : yPressureValue[yPressureValue.length - 1][0]} max={Math.floor((new Date().getTime() - startTime) / 1000) > 60 ? Math.floor((new Date().getTime() - startTime) / 1000) : 60} />
      </Grid>
      </Grid>
    </Grid>
  )
}
