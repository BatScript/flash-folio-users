import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false
}

export const loadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
