import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('user') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.token = action.payload
      if (state.token) {
        localStorage.setItem('user', state.token)
      }
    },
    logout: (state) => {
      state.token = null
      localStorage.removeItem('user')
    },
  },
})

export const { setData, logout } = authSlice.actions
export default authSlice.reducer
