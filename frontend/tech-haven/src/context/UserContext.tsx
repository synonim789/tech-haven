import { AxiosError } from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { toast } from 'react-toastify'
import UserReducer from '../reducer/UserReducer'
import { ChildrenType, TokenType, UserType, UserWithTokenType } from '../types'
import { customFetch } from '../utils/customFetch'
import { decodeToken } from '../utils/decodeToken'

type UserContextType = {
  getUser: (token: TokenType) => void
  deleteUser: (token: TokenType) => void
  clearUser: () => void
  updateUser: (user: UserWithTokenType) => void
  userLoading: boolean
  deleteUserLoading: boolean
  user: UserType
  updateUserLoading: boolean
}

const UserContext = createContext<UserContextType | null>(null)

const initialState = {
  userLoading: true,
  user: null,
  userError: false,
  deleteUserError: false,
  deleteUserLoading: false,
  role: '',
  updateUserError: false,
  updateUserLoading: false,
}

export const UserProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  // const { logoutUser } = useAuthContext()!

  const getUser = async (token: TokenType) => {
    const decodedToken = decodeToken(token)

    const { userId } = decodedToken
    dispatch({ type: 'GET_USER_START' })
    try {
      await customFetch
        .get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch({
            type: 'GET_USER_SUCCESS',
            payload: response.data,
          })
        })
    } catch (error) {
      const err = error as AxiosError
      dispatch({
        type: 'GET_USER_ERROR',
        payload: err?.response?.data,
      })
    } finally {
      dispatch({ type: 'GET_USER_LOADING_SUCCESS' })
    }
  }

  const deleteUser = async (token: TokenType) => {
    const decodedToken = decodeToken(token)
    const { userId } = decodedToken
    dispatch({ type: 'DELETE_USER_START' })
    try {
      await customFetch.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })

      dispatch({ type: 'DELETE_USER_SUCCESS' })
      logoutUser()
      toast.success('Account Deleted Successfully')
    } catch (error) {
      const err = error as AxiosError
      dispatch({
        type: 'DELETE_USER_ERROR',
        payload: err?.response?.data,
      })
    }
  }

  const updateUser = async (user: UserWithTokenType) => {
    const { token, name, email, phone, street, apartment, city, country, zip } =
      user

    const decodedToken = decodeToken(token)
    const { userId } = decodedToken

    dispatch({ type: 'UPDATE_USER_START' })
    try {
      await customFetch
        .put(
          `/users/${userId}`,
          { name, email, phone, street, apartment, city, country, zip },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success('User Info Successfully Updated')
          dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data })
        })
    } catch (error) {
      dispatch({ type: 'UPDATE_USER_ERROR' })
    }
  }

  const clearUser = () => {
    dispatch({ type: 'CLEAR_USER' })
  }

  return (
    <UserContext.Provider
      value={{ ...state, getUser, deleteUser, clearUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
