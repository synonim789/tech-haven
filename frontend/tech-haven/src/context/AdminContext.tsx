import axios from 'axios'
import { createContext, useContext, useEffect, useReducer } from 'react'
import AdminReducer from '../reducer/AdminReducer'
import { ChildrenType } from '../types'

type AdminContextState = {
  categories: []
  categoryLoading: boolean | null
  categoryError: boolean | null
  getCategories: () => void
}

const AdminContext = createContext<AdminContextState | null>(null)

const initialState = {
  categories: [],
  categoryLoading: false,
  categoryError: false,
}

export const AdminProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState)

  const getCategories = async () => {
    dispatch({ type: 'GET_CATEGORIES_START' })
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/categories'
      )
      dispatch({ type: 'GET_CATEGORIES_SUCCESS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'GET_CATEGORIES_ERROR' })
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <AdminContext.Provider value={{ ...state, getCategories }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(AdminContext)
}
