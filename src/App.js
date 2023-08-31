
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
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useDispatch, useSelector } from 'react-redux';
import { setData, updateData, newData } from './slices/dataSlice';
import { setSpecs } from './slices/graphSpecsSlice';
import { setTargetPressure, setCurrentEndTime, setCurrentPressure, setCurrentStartTime, setCurrentTemperature, setCurrentFlow, setCurrentBrew, setCurrentWeight, setCurrentManualBrew } from './slices/currentStateSlice';
import BrewUpdater from './components/BrewUpdater';

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
  // const [defaultData] = profileMap(profiles[8])
  const dispatch = useDispatch()
  
  const [selectedPage, setSelectedPage] = useState("dashboard")
  const [open, setOpen] = useState(false);
  // let characteristicTargetWeight, characteristicTargetPressure, characteristicBrew, device = undefined
  
  // const { currentBrew, currentWeight, currentPressure, currentTemperature, currentFlow, currentStartTime, currentEndTime, targetPressure, targetWeight, manualBrew } = currentState
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const setProfile = (profile) => {
    dispatch(setData(profile))
    setSelectedPage("dashboard")
    // dispatch(setTargetWeight(parseInt(profile.target_weight)))
    dispatch(setSpecs({
      height: '450px',
      displayYaxisLegend: true
    }))
  }

  const TEMP_UUID = "22cf5e58-b119-4da5-8341-56cc2378f406";
  const PRESSURE_UUID = "07a62719-c9c0-442f-af6c-336e8839469c";
  const BREW_UUID = "0ddcee2d-4a38-46a3-9054-04691f5a7e26";
  const TARGET_PRESSURE_UUID = "202c8717-9005-4eb3-876a-70f977a89c72";
  const WEIGHT_UUID = "8fe6deb9-02f5-4dbd-9bec-1b7291a9ba5a";
  const FLOW_UUID = "3a19025c-0dc3-492c-ae05-db00dfad91cd";
  const TARGET_WEIGHT_UUID = "9414b5a6-fcb2-492d-8023-e34348fa7870";

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
              onClick={() => {
                setSelectedPage("dashboard")
                dispatch(setSpecs({
                  height: '450px',
                  displayYaxisLegend: true
                }))
              }}
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
              onClick={() => {
                setSelectedPage("profiles")
                dispatch(setSpecs({
                  height: '200px',
                  displayYaxisLegend: false
                }))
              }}

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
            <Dashboard />
            <Buttons /></>
            : selectedPage === "profiles" ?
              <Profilling setProfile={setProfile} /> :
              ""}
        </Grid>
      </Box>
      <BrewUpdater /> 
    </Box>
  )
}

// const AppMemo = React.memo(App)

export default React.memo(App);
