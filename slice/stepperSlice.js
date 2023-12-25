// templateSlice.js

import { STEPS } from '@/constants/stepperConfig'
import { createSlice } from '@reduxjs/toolkit'

const stepperSlice = createSlice({
  name: 'stepper',
  initialState: {
    initialStep: 0,
    currentStep: 0
  },
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload
    },
    incrementStep: (state) => {
      state.currentStep += 1
    },
    decrementStep: (state) => {
      state.currentStep -= 1
    },
    resetStepper: (state) => {
      state.currentStep = 0
    }
  }
})

export const { setStep, incrementStep, decrementStep, resetStepper } = stepperSlice.actions;

export default stepperSlice.reducer
