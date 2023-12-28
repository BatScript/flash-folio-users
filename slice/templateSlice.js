// templateSlice.js

import { createSlice } from '@reduxjs/toolkit'

const templateSlice = createSlice({
  name: 'templates',
  initialState: {
    allTemplates: [],
    selectedTemplate: null,
    formData: null
  },
  reducers: {
    setAllTemplates: (state, action) => {
      state.allTemplates = action.payload
    },
    selectTemplate: (state, action) => {
      state.selectedTemplate = action.payload
    },
    setFormData: (state, action) => {
      state.formData = action.payload
    }
  }
})

export const { setAllTemplates, selectTemplate, setFormData } =
  templateSlice.actions

export default templateSlice.reducer
