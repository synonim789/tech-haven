import { createSlice } from '@reduxjs/toolkit'
import { UserType } from '../../types'

type initialStateType = {
  user: UserType | null
}

const initialState: initialStateType = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
