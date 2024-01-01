// templateSlice.js

import { createSlice } from '@reduxjs/toolkit'

const templateSlice = createSlice({
  name: 'templates',
  initialState: {
    allTemplates: [],
    selectedTemplate: null,
    formData: null,
    subDomain: ''
  },
  reducers: {
    // ! 
    setAllTemplates: (state, action) => {
      state.allTemplates = action.payload
    },
    selectTemplate: (state, action) => {
      state.selectedTemplate = action.payload
    },
    setFormData: (state, action) => {
      state.formData = action.payload
    },
    setSubdomain: (state, action) => {
      state.subDomain = action.payload
    }
  }
})

export const { setAllTemplates, selectTemplate, setFormData, setSubdomain } =
  templateSlice.actions

export default templateSlice.reducer
