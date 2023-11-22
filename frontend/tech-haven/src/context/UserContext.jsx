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
  updateUserError: false,
  updateUserLoading: false,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  const { logoutUser } = useAuthContext()

  const decodeToken = (token) => {
    const decodedToken = jwtDecode(token.token || token)
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
    } catch (error) {
      dispatch({ type: 'GET_USER_ERROR', payload: error.response })
    } finally {
      dispatch({ type: 'GET_USER_LOADING_SUCCESS' })
    }
  }

  const deleteUser = async (token) => {
    const decodedToken = decodeToken(token)
    const { userId } = decodedToken
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

  const updateUser = async (user) => {
    const { token, name, email, phone, street, apartment, city, country, zip } =
      user
    const decodedToken = decodeToken(token)
    const { userId } = decodedToken
    dispatch({ type: 'UPDATE_USER_START' })
    try {
      await axios
        .put(
          `http://localhost:3000/api/v1/users/${userId}`,
          { name, email, phone, street, apartment, city, country, zip },
          {
            headers: {
              Authorization: `Bearer: ${token}`,
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
