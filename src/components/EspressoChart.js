import React from 'react'
import Chart from 'react-apexcharts';

export default function EspressoChart({props}) {
  const [ yTempValue, yWeightValue, yFlowValue, yPressureValue] = props
  return (
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
