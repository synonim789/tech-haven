import axios, { AxiosError } from 'axios'
import { createContext, useContext, useReducer } from 'react'
import { toast } from 'react-toastify'
import AdminReducer from '../reducer/AdminReducer'
import { ChildrenType } from '../types'

type AdminContextState = {
  categories: []
  categoryLoading: boolean
  categoryError: boolean
  getCategories: () => void
  addProduct: (data: AddProductData) => void
  deleteProduct: ({ id, token }: DeleteProduct) => void
  addProductError: boolean
  addProductLoading: boolean
  addProductSuccess: boolean
}

type AddProductData = {
  token: {
    token: string
  }
  name: string
  description: string
  brand: string
  category: string
  price: number
  stock: number
  rating: number
  revCount: number
  isFeatured: boolean
  image: File[] | null
  images: File[] | null
}

const AdminContext = createContext<AdminContextState | null>(null)

const initialState = {
  categories: [],
  categoryLoading: false,
  categoryError: false,
  addProductLoading: false,
  addProductError: false,
  addProductSuccess: false,
  deleteProductLoading: false,
  deleteProductError: false
}

type DeleteProduct = {
  id: string
  token: {
    token: string
  }
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

  const addProduct = async (data: AddProductData) => {
    const formData = new FormData()
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i])
    }
    formData.append('image', data.image[0])
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('brand', data.brand)
    formData.append('category', data.category)
    formData.append('price', data.price)
    formData.append('countInStock', data.stock)
    formData.append('rating', data.rating)
    formData.append('numReviews', data.revCount)
    formData.append('isFeatured', data.isFeatured)
    const { token } = data

    dispatch({ type: 'ADD_PRODUCT_START' })
    try {
      await axios
        .post(
          'http://localhost:3000/api/v1/products/',

          formData,

          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          dispatch({ type: 'ADD_PRODUCT_SUCCESS' })
          toast.success('Product Added Successfully')
        })
    } catch (error) {
      const err = error as AxiosError
      dispatch({
        type: 'ADD_PRODUCT_ERROR',
        payload: err?.response?.data?.message,
      })
    }
  }

  const deleteProduct = async ({ id, token }: DeleteProduct) => {
    dispatch({ type: 'DELETE_PRODUCT_START' })
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      dispatch({ type: 'DELETE_PRODUCT_SUCCESS' })
      toast.success('Product Successfully Deleted')
    } catch (err) {
      dispatch({
        type: 'DELETE_PRODUCT_ERROR',
        payload: err?.response?.data?.message,
      })
    }
  }

  return (
    <AdminContext.Provider
      value={{ ...state, getCategories, addProduct, deleteProduct }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  return useContext(AdminContext)
}
