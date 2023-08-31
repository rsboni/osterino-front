import React from 'react'
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { selectFlow, selectLabels, selectPressure, selectTemperature, selectTime, selectWeight } from '../slices/dataSlice'
function EspressoChart() {
  const labels = useSelector(selectLabels)
  const time = useSelector(selectTime)
  const pressure = useSelector(selectPressure)
  const weight = useSelector(selectWeight)
  const temperature = useSelector(selectTemperature)
  const flow = useSelector(selectFlow)
  const {height, displayYaxisLegend} = useSelector((state) => state.graphSpecs)
  return (
    <Chart
      options={
        {
          annotations: {
            xaxis: labels
            
          },
          chart: {
            id: 'realtime',
            offsetX: 0,
            height: {height},
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
            categories: time
          },
          yaxis: [
            {
              title: {
                text: 'Pressure (bar)',
              },
              max: 10,
              min: 0,
              show: displayYaxisLegend
            },
            {
              opposite: false,
              title: {
                text: 'Temperature (ºC)',
              },
              max: 100,
              min: 70,
              show: displayYaxisLegend
            },
            {
              opposite: true,
              title: {
                text: 'Weight (g)',
              },
              max: 60,
              min: 0,
              show: displayYaxisLegend
            },
            {
              opposite: true,
              title: {
                text: 'Flow (g/s)',
              },
              max: 10,
              min: 0,
              show: displayYaxisLegend
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
        data: pressure
      },
      {
        name: 'Temperature',
        type: 'line',
        data: temperature,
        color: '#cf2539'
      },
      {
        name: 'Weight',
        type: 'line',
        data: weight,
        color: '#546E7A'
      },
      {
        name: 'Flow',
        type: 'line',
        data: flow,
        color: '#3DD142'
      }
      ]}

      height={height}
    />
  )
}

export default React.memo(EspressoChart)