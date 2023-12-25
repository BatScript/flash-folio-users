// templateThunks.js

import { setTemplates } from '@/slice/templateSlice'

export const fetchTemplates = () => async (dispatch, getState) => {
  const { templates } = getState()

  if (!templates.isFetched) {
    try {
      // Make your API request here (e.g., using axios)
      const response = await fetch('/api/templates').then((res) => res.json())

      // Dispatch the action to update the state with fetched data
      dispatch(setTemplates(response.data))
    } catch (error) {
      // Handle error
    }
  }
}
