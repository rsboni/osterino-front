const SERVICE_UUID = 0x1A02;
const TEMP_UUID = 0x1A01;
const CHARACTERISTIC_UUID = 0x1A02;
const BREW_UUID = 0x1A03;
const TARGET_PRESSURE_UUID = 0x1A04;

export const isWebBluetoothSupported = "bluetooth" in navigator;

export const connectToBluetoothDevice = async () => {
  try {
    console.log("Bluetooth supported: ", isWebBluetoothSupported)
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

export const connectToService = async () =>{
  const server = window.mserver;
  server.getPrimaryService(SERVICE_UUID);
  const service = await server.getPrimaryService(SERVICE_UUID);
  window.mservice = service;
}

export const startNotificationsTemperature = async () => {
  try {
    const service = window.mservice;
    const characteristic = await service.getCharacteristic(TEMP_UUID);
    window.mcharacteristic = characteristic;
    await characteristic.startNotifications();
    return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};


export const startNotificationsPressure = async () => {
  try {
    const service = window.mservice;
    const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);
    window.mcharacteristic = characteristic;
    await characteristic.startNotifications();
    return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const startNotificationsBrew = async () => {
  try {
    const service = window.mservice;
    const characteristic = await service.getCharacteristic(BREW_UUID);
    console.log("after getting brew characteristic")

    window.mcharacteristic = characteristic;
    console.log("after seting brew window characteristic")
    // await characteristic.startNotifications();
    console.log("after seting brew start notification")

    return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const startNotificationsTargetPressure = async () => {
  try {
    const service = window.mservice;
    const characteristic = await service.getCharacteristic(TARGET_PRESSURE_UUID);
    window.mcharacteristic = characteristic;
    await characteristic.startNotifications();
    return characteristic;
  } catch (error) {
    console.log(error)
    return error;
  }
};

export const disconnectFromBluetoothDevice = (device) => {
  if (!device || !device.gatt.connected) return Promise.resolve();
  return device.gatt.disconnect();
};  