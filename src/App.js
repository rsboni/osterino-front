import React, { useState, useEffect } from 'react'
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
import { makeStyles } from '@mui/material/styles'
import Grid from "@mui/material/Grid"
import { Typography } from '@mui/material';
import TimeChart from './TimeChart';

function App() {
  // const classes = useStyles()

  const [tempState, setTempState] = useState(
    96
  )
  const [pressureState, setPressureState] = useState(
    9
  )
  const [device, setDevice] = useState(undefined)
  const [yValue, setYValue] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [y2Value, setY2Value] = useState([80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98])
  const [isBrewing, setIsBrewing] = useState(false)
  const [time, setTime] = useState([0, 0])
  const toggleBrew = () => {
    if (!isBrewing) setTime([new Date().getTime(), new Date().getTime()])
    // else setTime([0,0])
    setIsBrewing(!isBrewing)

  }
  useEffect(() => {
    const interval = setInterval(() => {
      let t = [...time]
      t[1] = new Date().getTime()
      if (isBrewing) setTime(t);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

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
        if (y2Value.length === 401) {
          setY2Value(sp => (sp.slice(1)))
        }
        setY2Value(sp => ([...sp, (tempState1 / 100).toFixed(2)]));

        setTempState((tempState1 / 100).toFixed(2))
      })

      const characteristicPressure = await startNotificationsPressure(server).catch(e => console.log(e))
      characteristicPressure.addEventListener('characteristicvaluechanged', event => {
        const { value } = event.target
        var pressure = ''
        for (var i = 0; i < value.byteLength; i++) {
          pressure += String.fromCharCode(value.getInt8(i))
        }

        if (yValue.length === 401) {
          setYValue(sp => (sp.slice(1)))
        }
        setYValue(sp => ([...sp, (pressure / 100).toFixed(2)]));
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
      setDevice(null)
      return await disconnectFromBluetoothDevice(device);
    }
    catch (e) {
      console.log(e)
      return e
    }
  }

  return (
    <div className='App'>
      <Paper
        style={{
          padding: 10,
          margin: 10,
          minHeight: '90vh',
          height: '100%',
          backgroundColor: '#fafafa'
        }}
      >
        <Container>
          <Typography
            align='center'
            variant='h4'>Osterino Bluetooth</Typography>

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
          <Grid
            container
            spacing={1}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
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
                      show: false
                    },
                    markers: {
                      size: 0
                    },
                    xaxis: {
                      type: 'numeric',
                      range: tempState.length,
                    },
                    yaxis: [
                      {
                        title: {
                          text: 'Pressure',
                        },
                        max: 15,
                      min: -0.5
                      },
                      {
                        opposite: true,
                        title: {
                          text: 'Temperature',
                        },
                        max: 150,
                        min: 50
                      },
                      
                    ],
                    
                    legend: {
                      show: true,

                    },
                    
                    
                    tooltip: {
                      shared: true,
                      intersect: false,
                      y: {
                        formatter: function (y) {
                          if(typeof y !== "undefined") {
                            return  y.toFixed(0) + " points";
                          }
                          return y;
                        }
                      }
                    }
                  
                  }
                }
                // series={[{ data: yValue }]}
                series = { [{
                  name: 'Pressure',
                  type: 'area',
                  data: yValue
                },
                {
                  name: 'Temperature',
                  type: 'line',
                  data: y2Value,
                  color: '#cf2539',
                }]}

                height="300px"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <TempChart temp={tempState} />

            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>

              <PressureChart pressure={pressureState} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <TimeChart time={Math.floor(((time[1] - time[0]) % (1000 * 60)) / 1000)} />
            </Grid>
          </Grid>

          <Grid container spacing={2} >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              {device ? (
                <Button
                  variant='contained'
                  size='large'
                  className='button'
                  color='primary'
                  onClick={() => disconnect()}
                  spacing={2}
                >
                  DISCONNECT
                </Button>
              ) : (
                <Button
                  variant='contained'
                  size='large'
                  className='button'
                  color='primary'
                  onClick={() => onClick()}
                >
                  CONNECT
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Button
                variant='contained'
                size='large'
                className='button'
                color={!isBrewing ? ('success') : ('error')}
                onClick={() => toggleBrew()}

              >
                {!isBrewing ? ("BREW") : ("STOP")}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div >
  )
}


export default App;
