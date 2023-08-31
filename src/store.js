import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './slices/dataSlice'
import graphSpecsReducer from './slices/graphSpecsSlice'
import currentStateReducer from './slices/currentStateSlice'
import bleReducer from './slices/bluetoothSlice'
export default configureStore({
  reducer: {
    data: dataReducer,
    graphSpecs: graphSpecsReducer,
    currentState: currentStateReducer,
    BLE: bleReducer
  },
})