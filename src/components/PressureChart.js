import ReactApexChart from 'react-apexcharts'


var options = {
  chart: {
  height: 300,
  width: "40%",
  type: 'radialBar',
  toolbar: {
    show: false
  }
},
responsive: [
  {
    breakpoint: 1000,
    options: {
      width: "50%"
    }
  }
],
plotOptions: {
  radialBar: {
    startAngle: -135,
    endAngle: 225,
     hollow: {
      margin: 0,
      size: '60%',
      background: '#fff',
      image: undefined,
      imageOffsetX: 0,
      imageOffsetY: 0,
      position: 'front',
      dropShadow: {
        enabled: true,
        top: 3,
        left: 0,
        blur: 4,
        opacity: 0.24
      }
    },
    track: {
      background: '#fff',
      strokeWidth: '67%',
      margin: 0, // margin is in pixels
      dropShadow: {
        enabled: true,
        top: -3,
        left: 0,
        blur: 4,
        opacity: 0.35
      }
    },

    dataLabels: {
      show: true,
      name: {
        offsetY: -10,
        show: true,
        color: '#888',
        fontSize: '8pt'
      },
      value: {
        formatter: function(val) {
          return (val*15/100).toFixed(2) + " bar";
        },
        color: '#111',
        fontSize: '18pt',
        show: true,
      }
    }
  }
},
fill: {
  type: 'gradient',
  gradient: {
    shade: 'dark',
    type: 'horizontal',
    shadeIntensity: 0.5,
    gradienteFromColors: ['#2d8a16'],
    gradientToColors: ['#cf2539'],
    inverseColors: false,
    opacityFrom: 1,
    opacityTo: 1,
    stops: [0, 100]
  }
},
stroke: {
  lineCap: 'round'
},
};

function PressureChart({pressure}) {
  return(
    <ReactApexChart options={{...options, labels:['Pressure']}} series={[pressure/15*100]} type="radialBar"/>
  )
}

export default PressureChart