import userReducer from '@/slice/userSlice'
import templatesReducer from '@/slice/templateSlice'
import stepperSlice from '@/slice/stepperSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    user: userReducer,
    templates: templatesReducer,
    stepper: stepperSlice
  }
})
