import axios from 'axios'
import { createContext, useEffect, useContext, useReducer } from 'react'
import productsReducer from '../reducer/productsReducer'

const ProductsContext = createContext()

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
}

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  const getAllProducts = async () => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' })

    try {
      const response = await axios.get('http://localhost:3000/api/v1/products')
      const products = response.data
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: products })
    } catch (error) {
      dispatch({ type: 'GET_PRODUCTS_ERROR' })
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ ...state }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
