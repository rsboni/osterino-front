import React, { useState, useEffect } from 'react'
import './App.css';
import {
  connectToBluetoothDevice,
  connectToService,
  startNotificationsTemperature,
  disconnectFromBluetoothDevice,
  startNotificationsPressure,
  startNotificationsBrew,
  startNotificationsTargetPressure
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
import { curveCalculator } from './utils/profileCalculator';

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
  const theme = useTheme();
  const defaultCurve = [...curveCalculator(0, 2, 1, 0.5, 0), ...curveCalculator(2, 2, 9, 0.5, 1), ...curveCalculator(2, 9, 2, 0.5, 10), ...curveCalculator(9, 6, 40, 0.5, 12)]
  const [manualBrew, setManualBrew] = useState(false);
  const [selectedPage, setSelectedPage] = useState("dashboard")
  const [tempState, setTempState] = useState(96)
  const [pressureState, setPressureState] = useState(9)
  const [device, setDevice] = useState(undefined)
  const [yPressureValue, setYPressureValue] = useState(defaultCurve)
  const [yTempValue, setYTempValue] = useState([[0, 100], [51.5, 97]])
  const [isBrewing, setIsBrewing] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [demo, setDemo] = useState(false)
  const [characteristicBrew, setCharacteristicBrew] = useState(undefined)
  const [characteristicTargetPressure, setCharacteristicTargetPressure] = useState(undefined)
  const [targetPressure, setTargetPressure] = useState(9);
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


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
    if (isBrewing) {
      const interval = setInterval(() => {
        const t = ((new Date().getTime() - startTime) / 1000)
        if (isBrewing) {
          setYPressureValue(sp => [...sp, [t, pressureState]]);
          setYTempValue(sp => [...sp, [t, tempState]]);
        }
        if (!manualBrew) {
          for (var i = 0; i < defaultCurve.length; i++) {
            if (defaultCurve[i][0] <= t && defaultCurve[i + 1][0] > t) {
              setTargetPressure(defaultCurve[i][1])
              characteristicTargetPressure.writeValue(Uint8Array.of(defaultCurve[i][1] * 10)).then(_ => { })
                .catch(error => {
                  console.log('Argh! ' + error);
                })


            }

          }
        }
      }, 100);
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

  const onClick = async () => {
    try {
      const { device } = await connectToBluetoothDevice()
      setDevice(device)
      await connectToService();
      startNotificationsTemperature().then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', event => {
          const { value } = event.target
          var tempState1 = ''
          for (var i = 0; i < value.byteLength; i++) {
            tempState1 += String.fromCharCode(value.getInt8(i))
          }
          setTempState((tempState1 / 100).toFixed(2))
          // setTimeout(() => { }, 100);
        })
        console.log("Temperature characteristic added")
      }).catch(e => console.log(e))

      setCharacteristicBrew(await startNotificationsBrew()
        .then(characteristicBrew => {
          characteristicBrew.addEventListener('characteristicvaluechanged', event => {
            console.log("relay to" + event.target.value.getInt8(0))
          })
          console.log("Brew BLE characteristic added")
          return characteristicBrew;
        })
        .catch(e => console.log(e)))

      // setCharacteristicBrew(await startNotificationsBrew(server).catch(e => console.log(e)))
      // setTimeout(() => { }, 200);
      // characteristicBrew.addEventListener('characteristicvaluechanged', event => {
      //   console.log("relay to" + event.target.value.getInt8(0))
      // })

      setCharacteristicTargetPressure(await startNotificationsTargetPressure().then(
        characteristicTargetPressure => {
          characteristicTargetPressure.addEventListener('characteristicvaluechanged', event => {
            console.log("pressure to" + event.target.value.getInt8(0))
          })
          console.log("Target Pressure BLE characteristic added")
          return characteristicTargetPressure;
        }
      )
        .catch(e => console.log(e)))

      // setCharacteristicTargetPressure(await startNotificationsTargetPressure(server).catch(e => console.log(e)))
      // setTimeout(() => { }, 200);
      // characteristicTargetPressure.addEventListener('characteristicvaluechanged', event => {
      //   console.log("pressure to" + event.target.value.getInt8(0))
      // })

      await startNotificationsPressure().then(
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
  console.log(yPressureValue)
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
            <Dashboard props={[yPressureValue, yTempValue, targetPressureChange, tempState, pressureState, startTime, isBrewing, targetPressure]} />
            <Buttons props={[disconnect, onClick, setDemo, toggleBrew, device, isBrewing, demo]} /></>
            : selectedPage === "profiles" ?
              <Profilling /> :
              ""}
        </Grid>
      </Box>
    </Box>
  )
}

const AppMemo = React.memo(App)

export default AppMemo;
