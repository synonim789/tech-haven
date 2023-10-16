import axios from 'axios'
import { createContext, useEffect, useContext, useReducer } from 'react'
import productsReducer from '../reducer/productsReducer'

const ProductsContext = createContext()

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProduct: {},
  singleProductLoading: false,
  singleProductLoading: true,
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

  const getSingleProduct = async (url) => {
    dispatch({ type: 'GET_SINGLE_PRODUCT_BEGIN' })
    try {
      const response = await axios.get(url)
      const singleProduct = response.data
      dispatch({ type: 'GET_SINGLE_PRODUCT_SUCCESS', payload: singleProduct })
    } catch (error) {
      dispatch({ type: 'GET_SINGLE_PRODUCT_SUCCESS' })
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
