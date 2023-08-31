import { createSlice } from '@reduxjs/toolkit'

export const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: {
    currentPressure: 0,
    currentTemperature: 0,
    currentFlow: 0,
    currentBrew: false,
    currentWeight: 0,
    currentStartTime: 0,
    currentEndTime: 0,
    currentTargetPressure: 0,
    manualBrew: false,
  },
  reducers: {
    setCurrentPressure: (state, action) => {
      return {...state,
      currentPressure: Number(action.payload)
      }
    },
    setCurrentTemperature: (state, action) => {
      return {...state, 
      currentTemperature: Number(action.payload)}
    },    
    setCurrentFlow: (state, action) => {
      state.currentFlow = Number(action.payload)
    },
    setCurrentBrew: (state, action) => {
      state.currentBrew = action.payload
    },
    setCurrentWeight: (state, action) => {
      return {...state,
      currentWeight: Number(action.payload)
      }
    },
    setCurrentManualBrew: (state, action) => {
      state.manualBrew = action.payload
    },
    // setTargetWeight: (state, action) => {
    //   state.targetWeight= action.payload
    // },
    setCurrentStartTime: (state, action) => {
      state.currentStartTime = Number(action.payload)
    },
    setCurrentEndTime: (state, action) => {
      state.currentEndTime = Number(action.payload)
    },
    setCurrentTargetPressure: (state, action) => {
      state.currentTargetPressure = Number(action.payload)
    },
    
  },
})

export const { setCurrentBrew, setCurrentFlow, setCurrentManualBrew, setCurrentPressure, setCurrentTemperature, setCurrentWeight, setCurrentTargetPressure, setCurrentEndTime, setCurrentStartTime } = currentStateSlice.actions

export const selectCurrentTargetPresure = (state) => state.currentState.currentTargetPressure

export const selectCurrentWeight = (state) => state.currentState.currentWeight
export const selectCurrentTemperature = (state) => state.currentState.currentTemperature
export const selectCurrentPressure = (state) => state.currentState.currentPressure
export const selectCurrentTargetPressure = (state) => state.currentState.currentTargetPressure
export const selectCurrentStartTime = (state) => state.currentState.currentStartTime
export const selectCurrentEndTime = (state) => state.currentState.currentEndTime
export const selectCurrentBrew = (state) => state.currentState.currentBrew
export const selectCurrentFlow = (state) => state.currentState.currentFlow



export default currentStateSlice.reducer

