import React, { useEffect } from 'react'
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { updateData } from '../slices/dataSlice'
import { setCurrentTargetPressure } from '../slices/currentStateSlice'
import { writeTargetPressure } from '../slices/bluetoothSlice'
import { useDispatch } from 'react-redux';
function EspressoChart() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)
  const graphSpecs = useSelector((state) => state.graphSpecs)
  const height = graphSpecs.height
  const displayYaxisLegend = graphSpecs.displayYaxisLegend
  // console.log(data)

  return (
    <Chart
      options={
        {
          annotations: {
            xaxis: data.labels
            
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
            categories: data.time
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
        data: data.pressure
      },
      {
        name: 'Temperature',
        type: 'line',
        data: data.temperature,
        color: '#cf2539'
      },
      {
        name: 'Weight',
        type: 'line',
        data: data.weight,
        color: '#546E7A'
      },
      {
        name: 'Flow',
        type: 'line',
        data: data.flow,
        color: '#3DD142'
      }
      ]}

      height={height}
    />
  )
}

export default React.memo(EspressoChart)