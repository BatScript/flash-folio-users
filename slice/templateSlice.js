// templateSlice.js

import { fetchPortfolio, updatePortFolio } from '@/thunk/portfolioThunk'
import { fetchAllTemplates } from '@/thunk/templatesThunk'
import { createSlice } from '@reduxjs/toolkit'

const defaultFormData = {
  name: '',
  profession: '',
  listItems: [{ title: '', desc: '' }]
}

const templateSlice = createSlice({
  name: 'templates',
  initialState: {
    allTemplates: {
      status: null,
      data: []
    },
    portfolio: {
      status: null,
      selectedTemplate: null,
      formData: null,
      subDomain: null
    }
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
    },
    setSubdomain: (state, action) => {
      state.subDomain = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // get templates
      .addCase(fetchAllTemplates.pending, (state) => {
        state.allTemplates.status = 'loading'
      })
      .addCase(fetchAllTemplates.fulfilled, (state, action) => {
        state.allTemplates.status = 'succeeded'
        state.allTemplates.data = action.payload.data
      })
      .addCase(fetchAllTemplates.rejected, (state, action) => {
        state.allTemplates.status = 'failed'
        state.allTemplates.error =
          action.error.message || 'Failed to fetch templates'
      })
      // get portfolio
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        console.log(action.payload, 'ac pay')
        state.portfolio.status = 'succeeded'
        state.portfolio.subDomain = action.payload.subdomain
        console.log(state.portfolio.subDomain)
        state.portfolio.selectedTemplate = action.payload.template_id
        state.portfolio.formData = action.payload.template_data
          ? action.payload.template_data
          : defaultFormData
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.portfolio.status = 'failed'
      })
      .addCase(fetchPortfolio.pending, (state, action) => {
        state.portfolio.status = 'loading'
      })
      // update portfolio
      .addCase(updatePortFolio.fulfilled, (state, action) => {
        console.log('action is : ', action)
        state.portfolio.status = 'succeeded'
        state.portfolio.subDomain = action.payload.portfolio.subdomain
        state.portfolio.selectedTemplate = action.payload.portfolio.template_id
        state.portfolio.formData = action.payload.portfolio.template_data
          ? action.payload.portfolio.template_data
          : defaultFormData
      })
      .addCase(updatePortFolio.rejected, (state, action) => {
        console.log(action)
        state.portfolio.status = 'failed'
      })
      .addCase(updatePortFolio.pending, (state, action) => {
        state.portfolio.status = 'loading'
      })
  }
})

export const { setAllTemplates, selectTemplate, setFormData, setSubdomain } =
  templateSlice.actions

export default templateSlice.reducer
