import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTemplates } from '@/utilities/api'

export const fetchAllTemplates = createAsyncThunk(
  'templates/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const templates = await getAllTemplates()
      return templates
    } catch (error) {
      console.error('Error fetching templates:', error)
      return rejectWithValue([])
    }
  }
)
