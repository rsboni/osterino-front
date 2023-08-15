import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import './App.css';
import {
  connectToBluetoothDevice,
  startNotifications,
  disconnectFromBluetoothDevice,
  startNotificationsPressure,
  startNotificationsBrew,
  startNotificationsTargetPressure
} from './bluetooth'
import TempChart from './TempChart.js'
import PressureChart from './PressureChart';
import Chart from 'react-apexcharts';
// import { makeStyles } from '@mui/material/styles'
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
  const [yPressureValue, setYPressureValue] = useState([[0, 0.1], [1, 9]])
  const [yTempValue, setYTempValue] = useState([[0, 70], [1, 101]])
  const [isBrewing, setIsBrewing] = useState(false)
  // const [time, setTime] = useState([0, 0])
  const [startTime, setStartTime] = useState(0)
  const [demo, setDemo] = useState(false)
  const [characteristicBrew, setCharacteristicBrew] = useState(undefined)
  const [characteristicTargetPressure, setCharacteristicTargetPressure] = useState(undefined)
  const [targetPressure, setTargetPressure] = useState(9);

  const toggleBrew = () => {
    if (!isBrewing) {
      console.log("brewing")
      setStartTime(new Date().getTime())
      // setTime([new Date().getTime(), new Date().getTime()])
      setYPressureValue([[0, pressureState]])
      setYTempValue([[0, tempState]])
      if (device) {
        characteristicBrew.writeValue(Uint8Array.of(1)).then(_ => { })
          .catch(error => {
            console.log('Argh! ' + error);
          })
        characteristicTargetPressure.writeValue(Uint8Array.of(targetPressure * 10)).then(_ => { })
          .catch(error => {
            console.log('Argh! ' + error);
          })
        }
      }
    else {
    console.log("stopped")
    if (device) {
      characteristicBrew.writeValue(Uint8Array.of(0)).then(_ => { })
        .catch(error => {
          console.log('Argh! ' + error);
        })
    }

  }
  setIsBrewing(is => !is)
}

// setTimeout(() => characteristicBrew.writeValue(Uint8Array.of(0)).then(_ => console.log("change back")), 5000)

useEffect(() => {
  const interval = setInterval(() => {
    // let t = [...time]
    const t = ((new Date().getTime() - startTime) / 1000)
    if (isBrewing) {
      // setTime(t);
      setYPressureValue(sp => [...sp, [t, pressureState]]);
      setYTempValue(sp => [...sp, [t, tempState]]);
    }

    // if(demo){
    //   const newTemp = (Math.random() * 20) + 90
    //   const newPressure = (Math.random()*4) + 9
    //   setYTempValue(sp => ([...sp, (newTemp).toFixed(2)]));
    //   setTempState((newTemp).toFixed(2))
    //   setYPressureValue(sp => ([...sp, (newPressure).toFixed(2)]));
    //   setPressureState((newPressure).toFixed(2))
    // }
  }, 100);

  return () => clearInterval(interval);
}, [yTempValue]);

function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
  }
}

const targetPressureChange = async (e) => {
  setTargetPressure(e.target.value);
  console.log("target pressure = " + targetPressure)
  if (device) {
    characteristicTargetPressure.writeValue(Uint8Array.of(targetPressure * 10)).then(_ => { })
      .catch(error => {
        console.log('Argh! ' + error);
      })
  }
}

const onClick = async () => {
  try {
    const { server, device } = await connectToBluetoothDevice()
    setDevice(device)
    const characteristic = await startNotifications(server).catch(e => console.log(e))
    characteristic.addEventListener('characteristicvaluechanged', event => {
      const { value } = event.target
      var tempState1 = ''
      for (var i = 0; i < value.byteLength; i++) {
        tempState1 += String.fromCharCode(value.getInt8(i))
      }
      // if (yTempValue.length > 200) {
      // //   setYTempValue(sp => (sp.shift()))
      // // }
      // if (yTempValue[0] == 10 ){
      //   setYTempValue([...Array(40).fill((tempState1 / 100).toFixed(2))])
      // }
      setTempState((tempState1 / 100).toFixed(2))
      // if(isBrewing){
      //   let t = [...time]
      //   t[1] = new Date().getTime()
      //   setTime(t);
      // }
    })


    setCharacteristicBrew(await startNotificationsBrew(server).catch(e => console.log(e)))
    characteristicBrew.addEventListener('characteristicvaluechanged', event => {
      console.log("relay to" + event.target.value.getInt8(0))
    })


    setCharacteristicTargetPressure(await startNotificationsTargetPressure(server).catch(e => console.log(e)))
    characteristicTargetPressure.addEventListener('characteristicvaluechanged', event => {
      console.log("pressure to" + event.target.value.getInt8(0))
    })

    const characteristicPressure = await startNotificationsPressure(server).catch(e => console.log(e))
    characteristicPressure.addEventListener('characteristicvaluechanged', event => {
      const { value } = event.target
      var pressure = ''
      for (var i = 0; i < value.byteLength; i++) {
        pressure += String.fromCharCode(value.getInt8(i))
      }

      // if ([...yPressureValue].length > 201) {
      //   console.log("HIT")
      //   // setYPressureValue(sp => (sp.shift()))
      //   setYPressureValue(sp => ([...sp.slice(1), (pressure / 100).toFixed(2)]));
      // }


      // if (yPressureValue[0] == 0.1 ){
      //   setPressureState([...Array(40).fill((pressure / 100).toFixed(2))])
      // }
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
  <div className='App' style={{ backgroundColor: '#1B213B', padding: 0, margin: 0, height: "100%" }} >
    {/* <>{yTempValue.length > 41 ? setYTempValue(s => [ ...s.slice(-1)]) : ''}</>
      <>{yPressureValue.length > 41 ? setYPressureValue(s => [...s.slice(-1)]) : ''}</> */}

    <Paper
      style={{
        padding: 10,
        margin: 10,
        minHeight: '90vh',
        height: '100%',
        // backgroundColor: '#1B213B'
      }}
    >
      <Container>
        <Typography
          align='center'
          variant='h4'>Minibar BLE controller</Typography>

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
          <Grid container xs={11}>

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
                  max={10}
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  onKeyDown={preventHorizontalKeyboardNavigation}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TempChart temp={tempState} />

          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>

            <PressureChart pressure={pressureState} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TimeChart time={startTime && isBrewing ? Math.floor((new Date().getTime() - startTime) / 1000) : yPressureValue[yPressureValue.length - 1][0]} max={Math.floor((new Date().getTime() - startTime) / 1000) > 60 ? Math.floor((new Date().getTime() - startTime) / 1000) : 60} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
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
          <Grid item xs={12} sm={6} md={4} lg={4}>
            {!device ? (
              <Button
                variant='contained'
                size='large'
                className='button'
                color='secondary'
                onClick={() => setDemo(!demo)}
                spacing={2}
              >
                {!demo ? "DEMO" : "STOP DEMO"}
              </Button>
            ) : (""
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
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

App = React.memo(App)

export default App;
