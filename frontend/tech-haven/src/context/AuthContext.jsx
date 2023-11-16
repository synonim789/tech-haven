import axios from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { toast } from 'react-toastify'
import AuthReducer from '../reducer/AuthReducer'

const AuthContext = createContext()

const initialState = {
  token: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: !!JSON.parse(localStorage.getItem('user')),
  loggingError: null,
  loggingLoading: null,
  signingError: null,
  signingLoading: null,
  forgotError: null,
  forgotLoading: null,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'))
  //   if (user) {
  //     dispatch({ type: 'LOGIN', payload: user })
  //   }
  // }, [])

  const loginUser = async (user) => {
    const { email, password } = user
    dispatch({ type: 'LOGIN_START' })
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      const loggedUser = response.data
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
      const registeredUser = response.data
      localStorage.setItem('user', JSON.stringify(registeredUser))
      dispatch({ type: 'REGISTER', payload: registeredUser })
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: error.response.data })
    }
  }

  const forgetPassword = async (user) => {
    const { email } = user
    dispatch({ type: 'FORGOT_PASSWORD_START' })
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/forget-password',
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      )
      dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' })
      if (response.data.success) {
        toast.success('Link to reset password was sent to your email')
      }
    } catch (error) {
      dispatch({ type: 'FORGOT_PASSWORD_ERROR', payload: error.response.data })
    }
  }

  return (
    <AuthContext.Provider
      value={{ ...state, loginUser, logoutUser, registerUser, forgetPassword }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
