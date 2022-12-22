import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import ReactApexChart from 'react-apexcharts'
import './App.css';
import {
  connectToBluetoothDevice,
  startNotifications,
  disconnectFromBluetoothDevice,
  startNotificationsPressure
} from './bluetooth'

var options = {
  chart: {
  height: 350,
  type: 'radialBar',
  toolbar: {
    show: true
  }
},
plotOptions: {
  radialBar: {
    startAngle: -135,
    endAngle: 225,
     hollow: {
      margin: 0,
      size: '70%',
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
        fontSize: '17px'
      },
      value: {
        formatter: function(val) {
          return val;
        },
        color: '#111',
        fontSize: '36px',
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
    gradientToColors: ['#ABE5A1'],
    inverseColors: true,
    opacityFrom: 1,
    opacityTo: 1,
    stops: [0, 100]
  }
},
stroke: {
  lineCap: 'round'
},
};




// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     width: '100%'
//   },
//   menuButton: {
//     marginRight: theme.spacing(2)
//   },
//   title: {
//     flexGrow: 1
//   }
// }))

function App() {
  // const classes = useStyles()

  const [tempState, setTempState] = useState(
    11
  )
  const [pressureState, setPressureState] = useState(
    11
  )
  const [device, setDevice] = useState(undefined)


  const onClick = async () => {
    try {
      const { server, device } = await connectToBluetoothDevice()
      setDevice(device)
      const characteristic = await startNotifications(server).catch(e => console.log(e))
      characteristic.addEventListener('characteristicvaluechanged', event => {
        const { value } = event.target
        var tempState1 = ''        
        for (var i=0; i< 4; i++){
            tempState1 += String.fromCharCode(value.getInt8(i))
        }
        console.log(value)
        // console.log("int16 ", value.getInt16(0))

        console.log("Got temp: ", tempState1)
        setTempState((tempState1/100).toFixed(2))
      })

      const characteristicPressure = await startNotificationsPressure(server).catch(e => console.log(e))
      characteristicPressure.addEventListener('characteristicvaluechanged', event => {
        const { value } = event.target
        var pressure = ''        
        for (var i=0; i< value.byteLength; i++){
            pressure += String.fromCharCode(value.getInt8(i))
        }
        console.log(value)

        console.log("Got Presure: ", pressure)
        setPressureState((pressure/100).toFixed(2))
      })


      device.addEventListener('gattserverdisconnected', () => {
        disconnectFromBluetoothDevice(device)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const disconnect = async () => {
    try {
      return await disconnectFromBluetoothDevice(device);
    }
    catch (e) {
      console.log(e)
      return e
    }
  }

  return (
    <div className='App'>
      <Paper>
        <Container>
          {/* <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Rubik Cube
            </Typography>
          </Toolbar>
        </AppBar>
      </div> */}
          <div>
            {!device ? (
              <div>
                <Button
                  variant='contained'
                  size='medium'
                  className='button'
                  color='primary'
                  onClick={() => onClick()}

                  fullWidth
                >
                  CONNECT
                </Button>
              </div>
            ) : (
              // tempState + " " + pressureState
              <div>
              <ReactApexChart options={{...options, labels:['Temperature']}} series={[tempState]}  type="radialBar" height={350}/>
              <ReactApexChart options={{...options, labels:['Pressure']}} series={[pressureState]}  type="radialBar" height={350} />
              </div>
            )}
          </div>
          {device ? (
            <Button
              variant='contained'
              size='medium'
              className='button'
              color='primary'
              onClick={() => disconnect()}
              fullWidth
            >
              DISCONNECT
            </Button>
          ) : ""}
        </Container>
      </Paper>
    </div>
  )
}


export default App;
