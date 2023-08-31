import { createSlice } from '@reduxjs/toolkit'


export const graphSlice = createSlice({
  name: 'graphSpecs',
  initialState: {
    height: '400px',
    displayYaxisLegend: true,
    // selectedProfile: 
  },
  reducers: {
    setSpecs: (state, action) => {
      const spec = action.payload
      return {
        ...state,
        height: spec.height,
        displayYaxisLegend: spec.displayYaxisLegend
      }
    },
    
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { setSpecs } = graphSlice.actions

export default graphSlice.reducer