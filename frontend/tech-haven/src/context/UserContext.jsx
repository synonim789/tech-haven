import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useReducer } from 'react'
import { toast } from 'react-toastify'
import UserReducer from '../reducer/UserReducer'
import { useAuthContext } from './AuthContext'

const UserContext = createContext()

const initialState = {
  userLoading: true,
  user: undefined,
  userError: false,
  deleteUserError: false,
  deleteUserLoading: false,
  isAdmin: false,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  const { logoutUser } = useAuthContext()

  const decodeToken = (token) => {
    const decodedToken = jwtDecode(token.token)
    const { userId, isAdmin, exp } = decodedToken
    return { userId, isAdmin, exp }
  }

  const getUser = async (token) => {
    const decodedToken = decodeToken(token)
    const { userId } = decodedToken
    dispatch({ type: 'GET_USER_START' })
    try {
      await axios
        .get(`http://localhost:3000/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch({ type: 'GET_USER_SUCCESS', payload: response.data })
        })
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error) {
      dispatch({ type: 'GET_USER_ERROR', payload: error.response })
    } finally {
      dispatch({ type: 'UPDATE_USER_LOADING' })
    }
  }

  const deleteUser = async (token) => {
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

  const clearUser = () => {
    dispatch({ type: 'CLEAR_USER' })
  }

  return (
    <UserContext.Provider value={{ ...state, getUser, deleteUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
