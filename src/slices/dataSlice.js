import { createSlice } from '@reduxjs/toolkit'
import { profileMap } from '../utils/profileCalculator'
import { profiles } from '../utils/profiles'

const [data] = profileMap(profiles[8])


export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    ...data,
    weight: [],
    targetTime: data.time,
    targetPressure: data.pressure,
    targetWeight: data.weight
  },
  reducers: {
    setData: (state, action) => {
      const [data] = profileMap(action.payload)
      return {
        ...state,
        flow: data.flow,
        labels: data.labels,
        pressure: data.pressure,
        temperature: data.temperature,
        time: data.time,
        weight: [0],
        targetPressure: data.pressure,
        targetTime: data.time,
        targetWeight: data.weight
      }
    },
    updateData: (state, action) => {
      const newData = action.payload

      state.pressure.push(newData.pressure)
      state.temperature.push(newData.temperature)
      state.weight.push(newData.weight)
      state.flow.push(newData.flow)
      state.time.push(newData.time)
    },
    newData: (state, action) => {
      const newData = action.payload
      state.pressure = (newData.pressure)
      state.temperature = (newData.temperature)
      state.weight = (newData.weight)
      state.flow = (newData.flow)
      state.time = (newData.time)
      state.targetWeight = newData.targetWeight
    },
    setTargets: (state, action) => {
      const targets = action.payload
      state.targetPressure = targets.pressure
      state.targetTime = targets.time
    }
  },
})

export const { setData, updateData, newData } = dataSlice.actions

export const selectData = (state) => state.data

export default dataSlice.reducer