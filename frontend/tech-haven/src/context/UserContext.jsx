import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import UserReducer from '../reducer/UserReducer'
import { useAuthContext } from './AuthContext'

const UserContext = createContext()

const initialState = {
  user: null,
  userLoading: false,
  userError: false,
  deleteUserError: false,
  deleteUserLoading: false,
  isAdmin: false,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  const { token, logoutUser } = useAuthContext()

  let decodedToken = ''
  if (token) {
    decodedToken = jwtDecode(token.token)
  }
  const { exp, isAdmin, userId } = decodedToken
  useEffect(() => {
    if (token) {
      getUser()
    }
    dispatch({ type: 'CLEAR_USER' })
  }, [token])

  const getUser = async () => {
    dispatch({ type: 'GET_USER_START' })
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const user = response.data
      dispatch({ type: 'GET_USER_SUCCESS', payload: user })
    } catch (error) {
      dispatch({ type: 'GET_USER_ERROR', payload: error.response })
    }
  }

  const deleteUser = async () => {
    dispatch({ type: 'DELETE_USER_START' })
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch({ type: 'DELETE_USER_SUCCESS' })
      logoutUser()
      toast.success('Account Deleted Successfully')
    } catch (error) {
      dispatch({ type: 'DELETE_USER_ERROR', payload: error.response.data })
    }
  }

  return (
    <UserContext.Provider value={{ ...state, getUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
