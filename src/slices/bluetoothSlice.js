import { createSlice } from '@reduxjs/toolkit'
import { setCurrentEndTime, setCurrentStartTime, setCurrentBrew, setCurrentFlow, setCurrentPressure, setCurrentTemperature, setCurrentWeight, setTargetWeight, setCurrentTargetPressure } from './currentStateSlice';
import { newData } from './dataSlice';

const SERVICE_UUID = "381af1eb-b002-4a8e-b698-458841444945";
const TEMP_UUID = "22cf5e58-b119-4da5-8341-56cc2378f406";
const PRESSURE_UUID = "07a62719-c9c0-442f-af6c-336e8839469c";
const BREW_UUID = "0ddcee2d-4a38-46a3-9054-04691f5a7e26";
const TARGET_PRESSURE_UUID = "202c8717-9005-4eb3-876a-70f977a89c72";
const WEIGHT_UUID = "8fe6deb9-02f5-4dbd-9bec-1b7291a9ba5a";
const FLOW_UUID = "3a19025c-0dc3-492c-ae05-db00dfad91cd";
const TARGET_WEIGHT_UUID = "9414b5a6-fcb2-492d-8023-e34348fa7870";

let characteristicTargetWeight = {},
  characteristicTargetPressure = {},
  characteristicBrew = {},
  device = {}

const connectToBluetoothDevice = async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{
        services: [SERVICE_UUID],
      }]
    })
    const server = await device.gatt.connect()
    window.mdevice = device;
    window.mserver = server;
    return { device, server };
  } catch (err) {
    console.log(err)
    return err;
  }
}

const disconnectFromBluetoothDevice = () => {
  if (!device || !device.gatt.connected) return Promise.resolve();
  return device.gatt.disconnect();
};

const connectToService = async (_) => {
  const server = window.mserver;
  server.getPrimaryService(SERVICE_UUID);
  const service = await server.getPrimaryService(SERVICE_UUID);
  window.mservice = service;
  return service
}


export const bleSlice = createSlice({
  name: 'BLE',
  initialState: {
    // characteristicTargetWeight: {},
    // characteristicTargetPressure: {},
    // characteristicBrew: {},
    // device: {},
    // server: {},
    // service: {},
    isConnected: false
  },
  reducers: {
    // connectState: (state, action) => {
    //   const { device, server } = action.payload
    //   // state.device = device
    //   // state.server = server
    // // },
    // setDevice: (state, action) => {
    //   const device = action.payload
    //   state.device = device
    // },
    // setService: (state, action) => {
    //   const service = action.payload;
    //   state.service = service
    // },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload
    },
    // setCharacteristicTargetWeight: (state, action) => {
    //   state.characteristicTargetWeight = action.payload
    // },
    // setCharacteristicTargetPressure: (state, action) => {
    //   state.characteristicTargetPressure = action.payload
    // },
    // setCharacteristicBrew: (state, action) => {
    //   state.characteristicBrew = action.payload
    // }
  },
})

export const stopBrew = _ => (dispatch, getState) => {
  console.log("stopped brewing")
  dispatch(setCurrentEndTime(new Date().getTime()))
  dispatch(setCurrentBrew(false))
  dispatch(setCurrentTargetPressure(0))
  characteristicBrew.writeValue(Uint8Array.of(0)).then(_ => { })
    .catch(error => {
      console.log('Argh! ' + error);
    })
}

export const toggleBrew = () => (dispatch, getState) => {
  const { currentState, data} = getState()
  // const { device } = BLE
  const {targetWeight } = data
  const { currentTargetPressure, currentPressure, currentBrew, currentTemperature } = currentState;
  if (!currentBrew) {
    console.log("brewing")
    dispatch(setCurrentStartTime(new Date().getTime()))
    dispatch(newData({
      pressure: [currentPressure],
      temperature: [currentTemperature],
      weight: [0],
      flow: [0],
      time: [0],
      targetWeight: targetWeight
      // targetWeight: targetWeight
    }))
    if (device) {
      characteristicBrew.writeValue(Uint8Array.of(1))
        // .then(_ =>
        //   characteristicTargetPressure.writeValue(Uint8Array.of(currentTargetPressure * 10)).then(_ => { })
        //     .catch(error => {
        //       console.log('Argh! in target pressure characteristics ' + error);
        //     })
            .then(_ =>{
              console.log("sending target weight: ", targetWeight )
              characteristicTargetWeight.writeValue(Uint8Array.of(targetWeight)).then(_ => { console.log("Set Weight to = " + targetWeight) })
            }).catch(error => {
                  console.log('Argh! in target weight characteristics ' + error);
                })
    }
    dispatch(setCurrentBrew(true))

  }
  else {
    dispatch(stopBrew())
  }
}

export const writeTargetPressure = targetPressure => async (dispatch, getState) => {
  characteristicTargetPressure.writeValue(Uint8Array.of(targetPressure * 10)).then(_ => console.log("Target Presure changed to: ", targetPressure*10))
    .catch(error => {
      console.log('Argh! ' + error);
    })
}

export const connectBluetooth = _ => async (dispatch) => {
  try {
    connectToBluetoothDevice().then(({ device, server }) => {
      console.log(server)
      // dispatch(bleSlice.actions.connectState({ device, server }))
      dispatch(bleSlice.actions.setIsConnected(true))
      return server
    }).then(newServer => connectToService(newServer)).then(newService => {
      // dispatch(bleSlice.actions.setService(newService))
      return newService
    }).then(newService =>
      // const service = window.mservice;
      newService.getCharacteristic(TEMP_UUID).then(c => c.startNotifications()).then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', event => {
          const { value } = event.target
          var newTemperature = ''
          for (var i = 0; i < value.byteLength; i++) {
            newTemperature += String.fromCharCode(value.getInt8(i))
          }
          newTemperature = (newTemperature / 100).toFixed(2)
          // if (currentTemperature !== newTemperature)
          dispatch(setCurrentTemperature(Number(newTemperature)))
        })
        console.log("Temperature characteristic added")
        return newService
      })).then(newService =>
        newService.getCharacteristic(WEIGHT_UUID).then(c => c.startNotifications()).then(characteristic => {
          characteristic.addEventListener('characteristicvaluechanged', event => {
            const { value } = event.target
            var newWeight = ''
            for (var i = 0; i < value.byteLength; i++) {
              newWeight += String.fromCharCode(value.getInt8(i))
            }
            newWeight = (newWeight / 100).toFixed(1)
            // if (currentWeight !== newWeight)
            dispatch(setCurrentWeight(Number(newWeight)))
          })
          console.log("Weight characteristic added")
          return newService
        })).then(newService =>
          newService.getCharacteristic(BREW_UUID).then(c => c.startNotifications())
            .then(newCharacteristicBrew => {
              newCharacteristicBrew.addEventListener('characteristicvaluechanged', event => {
                console.log("Brew Recieved " + event.target.value.getInt8(0))
                dispatch(stopBrew())
              })
              console.log("Brew BLE characteristic added")
              characteristicBrew = newCharacteristicBrew
              // dispatch(bleSlice.actions.setCharacteristicBrew(newCharacteristicBrew))
              // characteristicBrew = newCharacteristicBrew
              return newService;
            })
            .then(newService =>
              newService.getCharacteristic(TARGET_PRESSURE_UUID).then(c => c.startNotifications())
                .then(
                  newCharacteristicTargetPressure => {
                    newCharacteristicTargetPressure.addEventListener('characteristicvaluechanged', event => {
                      console.log("pressure to" + event.target.value.getInt8(0))
                    })
                    console.log("Target Pressure BLE characteristic added")
                    characteristicTargetPressure = newCharacteristicTargetPressure
                    // dispatch(bleSlice.actions.setCharacteristicTargetPressure(newCharacteristicTargetPressure))
                    return newService;
                  }
                ).then(newService =>
                  newService.getCharacteristic(TARGET_WEIGHT_UUID).then(c => c.startNotifications())
                    .then(
                      newCharacteristicTargetWeight => {
                        newCharacteristicTargetWeight.addEventListener('characteristicvaluechanged', event => {
                          console.log("Recieved weight to" + event.target.value.getInt8(0))

                        })
                        console.log("Target Weight BLE characteristic added")
                        characteristicTargetWeight = newCharacteristicTargetWeight
                        // dispatch(bleSlice.actions.setCharacteristicTargetWeight(newCharacteristicTargetWeight))
                        return newService;
                      }
                    )
                    .then(newService =>
                      newService.getCharacteristic(FLOW_UUID).then(c => c.startNotifications())
                        .then(characteristicFlow => {
                          characteristicFlow.addEventListener('characteristicvaluechanged', event => {
                            const { value } = event.target
                            var newFlow = ''
                            for (var i = 0; i < value.byteLength; i++) {
                              newFlow += String.fromCharCode(value.getInt8(i))
                            }
                            newFlow = (newFlow / 100).toFixed(1)
                            // if (newFlow !== currentFlow)
                            dispatch(setCurrentFlow(Number(newFlow)))
                          })
                          console.log("Flow BLE characteristic added")
                          return newService
                        })
                        .then(newService =>
                          newService.getCharacteristic(PRESSURE_UUID).then(c => c.startNotifications())
                            .then(
                              characteristicPressure => {
                                characteristicPressure.addEventListener('characteristicvaluechanged', event => {
                                  const { value } = event.target
                                  var newPressure = ''
                                  for (var i = 0; i < value.byteLength; i++) {
                                    newPressure += String.fromCharCode(value.getInt8(i))
                                  }
                                  newPressure = (newPressure / 100).toFixed(2)
                                  // if (newPressure !== currentPressure)
                                  dispatch(setCurrentPressure(Number(newPressure)))
                                })
                                console.log("Pressure BLE characteristic added")
                              }
                            )
                            .catch(e => console.log(e)))))))
    device.addEventListener('gattserverdisconnected', () => {
      disconnectFromBluetoothDevice()
      dispatch(bleSlice.actions.setDevice(null))
      dispatch(bleSlice.actions.setIsConnected(false))
    })
  } catch (err) {
    console.log(err)
  }
}

export const disconnectBluetooth = _ => (dispatch, getState) => {
  disconnectFromBluetoothDevice()
  dispatch(bleSlice.actions.setDevice(null))
  dispatch(bleSlice.actions.setIsConnected(false))
}



// Action creators are generated for each case reducer function
export const { setData, updateData } = bleSlice.actions

export default bleSlice.reducer

