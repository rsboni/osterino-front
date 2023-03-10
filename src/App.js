import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import './App.css';
import {
  connectToBluetoothDevice,
  startNotifications,
  disconnectFromBluetoothDevice,
  startNotificationsPressure,
  startNotificationsBrew
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
  const [yPressureValue, setYPressureValue] = useState([...new Array(40).fill(0.1)])
  const [yTempValue, setYTempValue] = useState([...new Array(40).fill(10)])
  const [isBrewing, setIsBrewing] = useState(false)
  const [time, setTime] = useState([0, 0])
  const [demo, setDemo] = useState(false)
  const [characteristicBrew, setCharacteristicBrew] = useState(undefined)
  const toggleBrew = () => {
    if (!isBrewing) {
      setTime([new Date().getTime(), new Date().getTime()])
      setYPressureValue([...Array(40).fill(pressureState)])
      setYTempValue([...Array(40).fill(tempState)])
    }
    setIsBrewing(is => !is)

    characteristicBrew.writeValue(Uint8Array.of(1)).then(_ => {
      console.log('> Characteristic User Description changed to: ' + Uint8Array.of(1));
    })
    .catch(error => {
      console.log('Argh! ' + error);
    })
        setTimeout(() => characteristicBrew.writeValue(Uint8Array.of(0)).then(_ => console.log("change back")), 5000)
  }
  useEffect(() => {
    const interval = setInterval(() => {
      let t = [...time]
      t[1] = new Date().getTime()
      if (isBrewing) { 
        setTime(t);
        setYPressureValue(sp => (sp.length > 200 ? [ pressureState, ...sp.slice(0,-1)] : [pressureState, ...sp]));
        setYTempValue(sp => (sp.length > 200 ? [ tempState, ...sp.slice(0,-1)]: [ tempState, ...sp]));
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
        console.log("relay to" + event.target.value.getInt8(0) )
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
    <div className='App' style={{backgroundColor: '#1B213B', padding: 0, margin: 0, height: "100%" }} >
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
                      range: yTempValue.length > 200 ? 200 : yTempValue.length ,
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
                        max: 140,
                        min: 5
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
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TempChart temp={tempState} />

            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>

              <PressureChart pressure={pressureState} />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <TimeChart time={Math.floor(((time[1] - time[0]) % (1000 * 60)) / 1000)} />
            </Grid>
          </Grid>

          <Grid container spacing={2} >
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
                  {!demo? "DEMO": "STOP DEMO"}
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
