import React, { useState, useEffect } from 'react'
import './App.css';
import {
  connectToBluetoothDevice,
  startNotifications,
  disconnectFromBluetoothDevice,
  startNotificationsPressure,
  startNotificationsBrew,
  startNotificationsTargetPressure
} from './bluetooth'
import { Grid, Typography, Paper, Container } from '@mui/material'
import Buttons from './components/Buttons';
import Dashboard from './components/Dashboard';

function App() {
  const [tempState, setTempState] = useState(96)
  const [pressureState, setPressureState] = useState(9)
  const [device, setDevice] = useState(undefined)
  const [yPressureValue, setYPressureValue] = useState([[0, 0.1], [1, 9]])
  const [yTempValue, setYTempValue] = useState([[0, 70], [1, 101]])
  const [isBrewing, setIsBrewing] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [demo, setDemo] = useState(false)
  const [characteristicBrew, setCharacteristicBrew] = useState(undefined)
  const [characteristicTargetPressure, setCharacteristicTargetPressure] = useState(undefined)
  const [targetPressure, setTargetPressure] = useState(9);

  const toggleBrew = () => {
    if (!isBrewing) {
      console.log("brewing")
      setStartTime(new Date().getTime())
      setYPressureValue([[0, pressureState]])
      setYTempValue([[0, tempState]])
      if (device) {
        characteristicBrew.writeValue(Uint8Array.of(1)).then(_ => { })
          .catch(error => {
            console.log('Argh! in brew characteristics ' + error);
          })
        characteristicTargetPressure.writeValue(Uint8Array.of(targetPressure * 10)).then(_ => { })
          .catch(error => {
            console.log('Argh! in target pressure characteristics ' + error);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const t = ((new Date().getTime() - startTime) / 1000)
      if (isBrewing) {
        setYPressureValue(sp => [...sp, [t, pressureState]]);
        setYTempValue(sp => [...sp, [t, tempState]]);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [yTempValue]);


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
      setTimeout(() => { }, 100);
      characteristic.addEventListener('characteristicvaluechanged', event => {
        const { value } = event.target
        var tempState1 = ''
        for (var i = 0; i < value.byteLength; i++) {
          tempState1 += String.fromCharCode(value.getInt8(i))
        }
        setTempState((tempState1 / 100).toFixed(2))
        console.log("Temperature characteristic added")

      })

      setCharacteristicBrew(await startNotificationsBrew(server)
      .then(characteristicBrew => {
        characteristicBrew.addEventListener('characteristicvaluechanged', event => {
          console.log("relay to" + event.target.value.getInt8(0))
        })
        console.log("Brew BLE characteristic added")

      })
      .catch(e => console.log(e)))
   
      // setCharacteristicBrew(await startNotificationsBrew(server).catch(e => console.log(e)))
      // setTimeout(() => { }, 200);
      // characteristicBrew.addEventListener('characteristicvaluechanged', event => {
      //   console.log("relay to" + event.target.value.getInt8(0))
      // })

      setCharacteristicTargetPressure(await startNotificationsTargetPressure(server).then(
        characteristicTargetPressure => {
          characteristicTargetPressure.addEventListener('characteristicvaluechanged', event => {
            console.log("pressure to" + event.target.value.getInt8(0))
          })    
          console.log("Target Pressure BLE characteristic added")
        }
      )
      .catch(e => console.log(e)))
   
      // setCharacteristicTargetPressure(await startNotificationsTargetPressure(server).catch(e => console.log(e)))
      // setTimeout(() => { }, 200);
      // characteristicTargetPressure.addEventListener('characteristicvaluechanged', event => {
      //   console.log("pressure to" + event.target.value.getInt8(0))
      // })

      await startNotificationsPressure(server).then(
        characteristicPressure => {
          characteristicPressure.addEventListener('characteristicvaluechanged', event => {
            const { value } = event.target
            var pressure = ''
            for (var i = 0; i < value.byteLength; i++) {
              pressure += String.fromCharCode(value.getInt8(i))
            }
            setPressureState((pressure / 100).toFixed(2))
          })
        console.log("Pressure BLE characteristic added")

        }
      )
      .catch(e => console.log(e))
      

      // const characteristicPressure = await startNotificationsPressure(server).catch(e => console.log(e))
      // setTimeout(() => { }, 200);
      // characteristicPressure.addEventListener('characteristicvaluechanged', event => {
      //   const { value } = event.target
      //   var pressure = ''
      //   for (var i = 0; i < value.byteLength; i++) {
      //     pressure += String.fromCharCode(value.getInt8(i))
      //   }
      //   setPressureState((pressure / 100).toFixed(2))
      // })

      device.addEventListener('gattserverdisconnected', () => {
        disconnectFromBluetoothDevice(device)
        setDevice(null)
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
          <Grid
            container
            spacing={1}
          >
            <Dashboard props={[yPressureValue, yTempValue, targetPressureChange, tempState, pressureState, startTime, isBrewing]} ></Dashboard>
            <Buttons props={[disconnect, onClick, setDemo, toggleBrew, device, isBrewing, demo]} ></Buttons>
          </Grid>
        </Container>
      </Paper>
    </div >
  )
}

const AppMemo = React.memo(App)

export default AppMemo;
