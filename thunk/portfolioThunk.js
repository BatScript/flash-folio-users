import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPortfolio, setPortfolio } from '@/utilities/api'

export const fetchPortfolio = createAsyncThunk(
  'templates/fetchPortfolio',
  async (userId, { rejectWithValue }) => {
    try {
      const portfolioData = await getPortfolio(userId)
      console.log(portfolioData)
      return portfolioData
    } catch (error) {
      console.error('Error fetching portfolio data :', error)
      return rejectWithValue([])
    }
  }
)

export const updatePortFolio = createAsyncThunk(
  'templates/updatePortfolio',
  async ({ user_id, payload, method = 'POST' }, { rejectWithValue }) => {
    try {
      const res = await setPortfolio(user_id, payload, method)
      console.log('response: ', res)
      return res
    } catch (err) {
      console.error('Error setting portfolio data :', err)
      return rejectWithValue([])
    }
  }
)
