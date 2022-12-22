import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import './App.css';
import {
  connectToBluetoothDevice,
  startNotifications,
  disconnectFromBluetoothDevice,
  startNotificationsPressure
} from './bluetooth'
import TempChart from './TempChart.js'
import PressureChart from './PressureChart';
import Chart from 'react-apexcharts';

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
  const [yValue, setYValue ] = useState([]);

  const onClick = async () => {
    try {
      const { server, device } = await connectToBluetoothDevice()
      setDevice(device)
      const characteristic = await startNotifications(server).catch(e => console.log(e))
      characteristic.addEventListener('characteristicvaluechanged', event => {
        const { value } = event.target
        var tempState1 = ''
        for (var i = 0; i < 4; i++) {
          tempState1 += String.fromCharCode(value.getInt8(i))
        }
        console.log(value)
        // console.log("int16 ", value.getInt16(0))

        console.log("Got temp: ", tempState1)
        setTempState((tempState1 / 100).toFixed(2))
      })

      const characteristicPressure = await startNotificationsPressure(server).catch(e => console.log(e))
      characteristicPressure.addEventListener('characteristicvaluechanged', event => {
        const { value } = event.target
        var pressure = ''
        for (var i = 0; i < value.byteLength; i++) {
          pressure += String.fromCharCode(value.getInt8(i))
        }
        console.log(value)

        console.log("Got Presure: ", pressure)
        if (yValue.length = 4001) {
          setYValue(sp => (sp.slice(1)))
        }
        setYValue(sp =>  ([...sp, (pressure/100).toFixed(2)]));
        setPressureState((pressure / 100).toFixed(2))
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
                <Chart
                  options={
                    {
                      chart: {
                        id: 'realtime',
                        height: 350,
                        type: 'line',
                        animations: {
                          enabled: true,
                          easing: 'linear',
                          dynamicAnimation: {
                            speed: 1000
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
                        text: 'Pressure',
                        align: 'left'
                      },
                      markers: {
                        size: 0
                      },
                      xaxis: {
                        type: 'datetime',
                        range: 400
                      },
                      yaxis: {
                        max: 15
                      },
                      legend: {
                        show: false
                      },
                      series: [{
                        data: [yValue]
                      }]
                    }
                  }
                  series={[{ data: yValue }]}

                  width="100%"

                  height="300px"
                />
                <div>
                  <TempChart temp={tempState} width="40%"/>
                  <PressureChart pressure={pressureState} width="40%" />
                </div>
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
