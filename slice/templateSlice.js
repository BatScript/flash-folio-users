// templateSlice.js

import { createSlice } from '@reduxjs/toolkit'

const templateSlice = createSlice({
  name: 'templates',
  initialState: {
    data: [],
    isFetched: false
  },
  reducers: {
    setTemplates: (state, action) => {
      state.data = action.payload
      state.isFetched = true
    }
  }
})

export const { setTemplates } = templateSlice.actions

export default templateSlice.reducer
