import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TempChart from './TempChart.js'
import PressureChart from './PressureChart';
import Chart from 'react-apexcharts';
import Grid from "@mui/material/Grid"
import TimeChart from './TimeChart';
import WeightChart from './WeightChart.js';


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
                      text: 'Pressure (BAR)',
                    },
                    max: 10,
                    min: 0
                  },
                  {
                    opposite: false,
                    title: {
                      text: 'Temperature (ºC)',
                    },
                    max: 130,
                    min: 70
                  },
                  {
                    opposite: true,
                    title: {
                      text: 'Weight (g)',
                    },
                    max: 60,
                    min: 0
                  },
                  {
                    opposite: true,
                    title: {
                      text: 'Flow (g/s)',
                    },
                    max: 10,
                    min: 0
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
            },
            {
              name: 'Weight',
              type: 'line',
              data: yWeightValue,
              color: '#546E7A'
            },
            // {
            //   name: 'Flow',
            //   type: 'line',
            //   data: yFlowValue,
            //   color: '#3DD142'
            // }
          ]}

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
