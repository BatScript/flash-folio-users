import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  portfolio: {}
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.data = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateUserData } = userSlice.actions

export default userSlice.reducer
