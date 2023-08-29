import React, { useState, useEffect } from 'react'
import './App.css';
import {
  connectToBluetoothDevice,
  connectToService,
  disconnectFromBluetoothDevice
} from './bluetooth'
import { Grid, Typography } from '@mui/material'
import Buttons from './components/Buttons';
import Dashboard from './components/Dashboard';
import Profilling from './components/Profilling'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Bluetooth, Coffee, Settings, SsidChart, Water } from '@mui/icons-material';
import { profileMap } from './utils/profileCalculator';
import { profiles } from './utils/profiles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



function App() {
  const [xValueDefault, yTempValueDefault, yWeightValueDefault, yFlowValueDefault, yPressureValueDefault, labelsDefault] = profileMap(profiles[8])
  
  const theme = useTheme();
  const [defaultCurve, setDefaultCurve] = useState(yPressureValueDefault)
  const [defaultX, setDefaultX] = useState(xValueDefault)
  const [targetWeight, setTargetWeight] = useState(40);
  const [manualBrew, setManualBrew] = useState(false);
  const [selectedPage, setSelectedPage] = useState("dashboard")
  const [tempState, setTempState] = useState(96)
  const [pressureState, setPressureState] = useState(9)
  const [weight, setWeight] = useState(0)
  const [flow, setFlow] = useState(0)
  const [device, setDevice] = useState(undefined)
  const [yPressureValue, setYPressureValue] = useState(yPressureValueDefault)
  const [xValue, setXvalue] = useState(xValueDefault)
  const [yTempValue, setYTempValue] = useState(yTempValueDefault)
  const [yWeightValue, setYWeightValue] = useState(yWeightValueDefault)
  const [yFlowValue, setYFlowValue] = useState(yFlowValueDefault)
  const [labels, setLabels] = useState(labelsDefault)
  const [isBrewing, setIsBrewing] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [demo, setDemo] = useState(false)
  const [characteristicBrew, setCharacteristicBrew] = useState(undefined)
  const [characteristicTargetPressure, setCharacteristicTargetPressure] = useState(undefined)
  const [characteristicTargetWeight, setCharacteristicTargetWeight] = useState(undefined)
  const [targetPressure, setTargetPressure] = useState(9);
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const setProfile = (profile) => {
    const [xValueDefault, yTempValueDefault, yWeightValueDefault, yFlowValueDefault, yPressureValueDefault, labelsDefault] = profileMap(profile)
      setYTempValue(yTempValueDefault)
      setYWeightValue(yWeightValueDefault)
      setYFlowValue(yFlowValueDefault)
      setYPressureValue(yPressureValueDefault)
      setXvalue(xValueDefault)
      setDefaultX(xValueDefault)
      setLabels(labelsDefault)
      setSelectedPage("dashboard")
      setDefaultCurve(yPressureValueDefault)
      setTargetWeight(parseInt(profile.target_weight))
    }

  const toggleBrew = () => {
    if (!isBrewing) {
      console.log("brewing")
      setStartTime(new Date().getTime())
      setYPressureValue([pressureState])
      setYTempValue([tempState])
      setYWeightValue([0])
      setYFlowValue([0])
      setXvalue([0])
      if (device) {
        characteristicBrew.writeValue(Uint8Array.of(1)).then(_ => { })
          .catch(error => {
            console.log('Argh! in brew characteristics ' + error);
          }).then(_ => 
        characteristicTargetPressure.writeValue(Uint8Array.of(targetPressure * 10)).then(_ => {})
          .catch(error => {
            console.log('Argh! in target pressure characteristics ' + error);
          }).then(_=>
        characteristicTargetWeight.writeValue(Uint8Array.of(targetWeight)).then(_ => { console.log("Set Weight to = " + targetWeight) })
          .catch(error => {
            console.log('Argh! in target weight characteristics ' + error);
          })))
      }
    setIsBrewing(true) 

    }
    else {
      stopBrew()
    }
  }

  const stopBrew = () => {
    console.log("stopped brewing")
      setEndTime(new Date().getTime())
      if (device) {
        characteristicBrew.writeValue(Uint8Array.of(0)).then(_ => { })
          .catch(error => {
            console.log('Argh! ' + error);
          })
      }
      setIsBrewing(false);
  }

  useEffect(() => {
    if (isBrewing) {
      const interval = setInterval(() => {
        const t = ((new Date().getTime() - startTime) / 1000)
        if (isBrewing) {
          setXvalue(sp => [...sp, t])
          setYPressureValue(sp => [...sp, pressureState]);
          setYTempValue(sp => [...sp,tempState]);
          setYWeightValue(sp => [...sp, weight])
          setYFlowValue(sp => [...sp, flow])
          console.log("Pressure: " + pressureState + "Weight: " + weight + "TargetPressure: " + targetPressure);

        }
        if (!manualBrew) {
          for (var i = 0; i < defaultCurve.length - 1; i++) {
            if (defaultX[i] <= t && defaultX[i + 1] > t) {
              if (targetPressure !== defaultCurve[i]) {
                setTargetPressure(defaultCurve[i])
                console.log("Setting presure to " + (defaultCurve[i] * 10))
                characteristicTargetPressure.writeValue(Uint8Array.of(defaultCurve[i] * 10)).then(_ => { })
                  .catch(error => {
                    console.log('Argh! ' + error);
                  })
              }


            }

          }
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [yTempValue]);


  const targetPressureChange = async (e) => {
    // setManualBrew(true);
    setTargetPressure(e.target.value);
    console.log("target pressure = " + targetPressure)
    if (device) {
      characteristicTargetPressure.writeValue(Uint8Array.of(targetPressure * 10)).then(_ => { })
        .catch(error => {
          console.log('Argh! ' + error);
        })
    }
  }

  const TEMP_UUID = "22cf5e58-b119-4da5-8341-56cc2378f406";
  const PRESSURE_UUID = "07a62719-c9c0-442f-af6c-336e8839469c";
  const BREW_UUID = "0ddcee2d-4a38-46a3-9054-04691f5a7e26";
  const TARGET_PRESSURE_UUID = "202c8717-9005-4eb3-876a-70f977a89c72";
  const WEIGHT_UUID = "8fe6deb9-02f5-4dbd-9bec-1b7291a9ba5a";
  const FLOW_UUID = "3a19025c-0dc3-492c-ae05-db00dfad91cd";
  const TARGET_WEIGHT_UUID = "9414b5a6-fcb2-492d-8023-e34348fa7870";


  const onClick = async () => {
    try {
      const { device } = await connectToBluetoothDevice()
      setDevice(device)
      await connectToService();
      const service = window.mservice;
      service.getCharacteristic(TEMP_UUID).then(c => c.startNotifications()).then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', event => {
          const { value } = event.target
          var tempState1 = ''
          for (var i = 0; i < value.byteLength; i++) {
            tempState1 += String.fromCharCode(value.getInt8(i))
          }
          setTempState((tempState1 / 100).toFixed(2))
        })
        console.log("Temperature characteristic added")
      }).then(_ =>

        service.getCharacteristic(WEIGHT_UUID).then(c => c.startNotifications()).then(characteristic => {
          characteristic.addEventListener('characteristicvaluechanged', event => {
            const { value } = event.target
            var weightState = ''
            for (var i = 0; i < value.byteLength; i++) {
              weightState += String.fromCharCode(value.getInt8(i))
            }
            setWeight((weightState / 100).toFixed(1))
          })
          console.log("Weight characteristic added")
        })).then(_ =>


          service.getCharacteristic(BREW_UUID).then(c => c.startNotifications())
            .then(characteristicBrew => {
              characteristicBrew.addEventListener('characteristicvaluechanged', event => {
                console.log("relay to" + event.target.value.getInt8(0))
                stopBrew();
              })
              console.log("Brew BLE characteristic added")
              setCharacteristicBrew(characteristicBrew)
              return characteristicBrew;
            })
            .then(_ =>
              service.getCharacteristic(TARGET_PRESSURE_UUID).then(c => c.startNotifications())
                .then(
                  characteristicTargetPressure => {
                    characteristicTargetPressure.addEventListener('characteristicvaluechanged', event => {
                      console.log("pressure to" + event.target.value.getInt8(0))
                    })
                    console.log("Target Pressure BLE characteristic added")
                    setCharacteristicTargetPressure(characteristicTargetPressure)
                    return characteristicTargetPressure;
                  }
                ).then(_ =>
              service.getCharacteristic(TARGET_WEIGHT_UUID).then(c => c.startNotifications())
                .then(
                  characteristicTargetWeight => {
                    characteristicTargetWeight.addEventListener('characteristicvaluechanged', event => {
                      console.log("Target weight to" + event.target.value.getInt8(0))

                    })
                    console.log("Target Weight BLE characteristic added")
                    setCharacteristicTargetWeight(characteristicTargetWeight)
                    return characteristicTargetWeight;
                  }
                )
                .then(_ =>
                  service.getCharacteristic(FLOW_UUID).then(c => c.startNotifications())
                    .then(characteristicFlow => {
                      characteristicFlow.addEventListener('characteristicvaluechanged', event => {
                        const { value } = event.target
                        var flow = ''
                        for (var i = 0; i < value.byteLength; i++) {
                          flow += String.fromCharCode(value.getInt8(i))
                        }
                        setFlow((flow / 100).toFixed(1))
                      })
                      console.log("Flow BLE characteristic added")
                    })
                    .then(_ =>
                      service.getCharacteristic(PRESSURE_UUID).then(c => c.startNotifications())
                        .then(
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
                        .catch(e => console.log(e)))))))

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


    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Minibar Controller (BLE)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={'Brew'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => setSelectedPage("dashboard")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Coffee />
              </ListItemIcon>
              <ListItemText primary={'Brew'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Steam'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Water />
              </ListItemIcon>
              <ListItemText primary={'Steam'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Profiles'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => setSelectedPage("profiles")}

            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <SsidChart />
              </ListItemIcon>
              <ListItemText primary={'Profiles'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={'Settings'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Settings />
              </ListItemIcon>
              <ListItemText primary={'Settings'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Bluetooth'} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Bluetooth />
              </ListItemIcon>
              <ListItemText primary={'Bluetooth'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container spacing={1}>
          {selectedPage === "dashboard" ? <>
            <Dashboard props={[xValue, yPressureValue, yTempValue, yWeightValue, yFlowValue, labels, targetPressureChange, tempState, pressureState, startTime, endTime, isBrewing, targetPressure, weight, targetWeight]} />
            <Buttons props={[disconnect, onClick, setDemo, toggleBrew, device, isBrewing, demo]} /></>
            : selectedPage === "profiles" ?
              <Profilling setProfile={setProfile}/> :
              ""}
        </Grid>
      </Box>
    </Box>
  )
}

const AppMemo = React.memo(App)

export default AppMemo;
