import { useSelector } from "react-redux";

const SERVICE_UUID = "381af1eb-b002-4a8e-b698-458841444945";
const TEMP_UUID = "22cf5e58-b119-4da5-8341-56cc2378f406";
const PRESSURE_UUID = "07a62719-c9c0-442f-af6c-336e8839469c";
const BREW_UUID = "0ddcee2d-4a38-46a3-9054-04691f5a7e26";
const TARGET_PRESSURE_UUID = "202c8717-9005-4eb3-876a-70f977a89c72";
const WEIGHT_UUID = "8fe6deb9-02f5-4dbd-9bec-1b7291a9ba5a";



// let characteristicTargetWeight, characteristicTargetPressure, characteristicBrew, device = undefined

export const isWebBluetoothSupported = "bluetooth" in navigator;

// export const BluetoothHelpers = () =>{
//   const { currentBrew, currentWeight, currentPressure, currentTemperature, currentFlow, currentStartTime, currentEndTime, targetPressure, targetWeight, manualBrew } = useSelector((state) => state.currentState)
//   const { characteristicTargetWeight, characteristicTargetPressure,characteristicBrew, device  } = useSelector((state) => state.BLE)
// }

// const writeTargetPressure = (pressure, characteristicTargetPressure, device) =>{
//   if (device) {
//     characteristicTargetPressure.writeValue(Uint8Array.of(pressure * 10)).then(_ => { })
//       .catch(error => {
//         console.log('Argh! ' + error);
//       })
//   }
// }

export const ConnectToBluetoothDevice = async () => {
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
};

export const connectToService = async () => {
  const server = window.mserver;
  server.getPrimaryService(SERVICE_UUID);
  const service = await server.getPrimaryService(SERVICE_UUID);
  window.mservice = service;
  return service
}

export const startNotificationsTemperature = async () => {
  try {
    const service = window.mservice;
    return service.getCharacteristic(TEMP_UUID).then(characteristic =>
    // window.mcharacteristic = characteristic;
    {
      characteristic.startNotifications()
      return characteristic
    })
    // return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};


export const startNotificationsPressure = async () => {
  try {
    const service = window.mservice;
    return service.getCharacteristic(PRESSURE_UUID).then(characteristic =>
    // window.mcharacteristic = characteristic;
    {
      characteristic.startNotifications()
      return characteristic
    })

    // return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};


export const startNotificationsWeight = async () => {
  try {
    const service = window.mservice;
    return service.getCharacteristic(WEIGHT_UUID).then(characteristic =>
      // window.mcharacteristic = characteristic;
      {
        characteristic.startNotifications()
        return characteristic
      })
    // return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const startNotificationsBrew = async () => {
  try {
    const service = window.mservice;
    return service.getCharacteristic(BREW_UUID).then(characteristic =>
      // window.mcharacteristic = characteristic;
      {
        characteristic.startNotifications()
        return characteristic
      })

    // return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const startNotificationsTargetPressure = async () => {
  try {
    const service = window.mservice;
    return service.getCharacteristic(TARGET_PRESSURE_UUID).then(characteristic =>
      // window.mcharacteristic = characteristic;
      {
        characteristic.startNotifications()
        return characteristic
      })
    // return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};


export const disconnectFromBluetoothDevice = (device) => {
  if (!device || !device.gatt.connected) return Promise.resolve();
  return device.gatt.disconnect();
};  