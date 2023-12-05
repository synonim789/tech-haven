import axios, { AxiosError } from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { toast } from 'react-toastify'
import AuthReducer from '../reducer/AuthReducer'
import { ChildrenType } from '../types'

type userLoginType = {
  email: string
  password: string
}

type registerUserType = {
  email: string
  name: string
  password: string
}

type forgotPasswordType = {
  email: string
}

type AuthContextType = {
  loginUser: (user: userLoginType) => void
  logoutUser: () => void
  registerUser: (user: registerUserType) => void
  forgetPassword: (user: forgotPasswordType) => void
  token: any
  loggingError: boolean
  loggingLoading: boolean
  signingError: boolean
  signingLoading: boolean
  forgotError: boolean
  forgotLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const initialState = {
  token: JSON.parse(localStorage.getItem('user') as any),
  loggingError: false,
  loggingLoading: false,
  signingError: false,
  signingLoading: false,
  forgotError: false,
  forgotLoading: false,
}

export const AuthProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const loginUser = async (user: userLoginType) => {
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
      const err = error as AxiosError
      console.log(err)

      dispatch({ type: 'LOGIN_ERROR', payload: err?.response?.data })
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT_USER' })
  }

  const registerUser = async (user: registerUserType) => {
    const { email, name, password } = user
    console.log(user)

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
      const err = error as AxiosError

      dispatch({ type: 'LOGIN_ERROR', payload: err?.response?.data.message })
    }
  }

  const forgetPassword = async (user: forgotPasswordType) => {
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
      const err = error as AxiosError
      dispatch({ type: 'LOGIN_ERROR', payload: err?.response?.data })
    }
  }

  return (
    <AuthContext.Provider
      value={{ loginUser, logoutUser, registerUser, forgetPassword, ...state }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
