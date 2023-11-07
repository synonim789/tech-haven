import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'
import UserReducer from '../reducer/UserReducer'

const UserContext = createContext()

const initialState = {
  user: null,
  error: null,
  loading: null,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  const loginUser = async (user) => {
    const { email, password } = user
    dispatch({ type: 'LOGIN_START' })
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      const loggedUser = await response.data
      dispatch({ type: 'LOGIN', payload: loggedUser })
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.response.data })
    }
  }
  return (
    <UserContext.Provider value={{ ...state, loginUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
