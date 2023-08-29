import React from 'react'
import Chart from 'react-apexcharts';

export default function EspressoChart({ props }) {
  const [yTempValue, yWeightValue, yFlowValue, yPressureValue, labels = [], displayYaxisLegend = true] = props
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
      {
        name: 'Flow',
        type: 'line',
        data: yFlowValue,
        color: '#3DD142'
      }
      ]}

      height="300px"
    />
  )
}
