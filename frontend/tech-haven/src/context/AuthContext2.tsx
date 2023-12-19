import { createContext, useContext, useReducer } from 'react'
import AuthReducer2 from '../reducer/AuthReducer2'
import { ChildrenType } from '../types'

type AuthContext2 = {
  token: null | string
  loginUserInContext: (data: string) => void
  logoutUserInContext: () => void
}

const initialState = {
  token: null,
}

export const AuthContext2 = createContext<AuthContext2 | undefined>(undefined)

export const AuthContext2Provider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(AuthReducer2, initialState)

  const loginUserInContext = (data: string) => {
    dispatch({ type: 'SET_TOKEN', payload: data })
  }

  const logoutUserInContext = () => {
    dispatch({ type: 'CLEAR_TOKEN' })
  }

  return (
    <AuthContext2.Provider
      value={{ loginUserInContext, logoutUserInContext, ...state }}
    >
      {children}
    </AuthContext2.Provider>
  )
}

export const useAuthContext2 = () => useContext(AuthContext2)
