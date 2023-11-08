import axios from 'axios'
import { createContext, useContext, useEffect, useReducer } from 'react'
import UserReducer from '../reducer/UserReducer'

const UserContext = createContext()

const initialState = {
  user: null,
  error: null,
  loading: null,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

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
      localStorage.setItem('user', JSON.stringify(loggedUser))
      dispatch({ type: 'LOGIN', payload: loggedUser })
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.response.data })
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT_USER' })
  }

  const registerUser = async (user) => {
    const { email, name, password } = user
    dispatch({ type: 'REGISTER_START' })
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/sign-up',
        { email, name, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      const registeredUser = await response.data
      localStorage.setItem('user', JSON.stringify(registeredUser))
      dispatch({ type: 'REGISTER', payload: registeredUser })
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: error.response.data })
    }
  }

  return (
    <UserContext.Provider
      value={{ ...state, loginUser, logoutUser, registerUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
