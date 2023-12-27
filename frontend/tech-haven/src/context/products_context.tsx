import { createContext, useContext, useEffect, useReducer } from 'react'
import productsReducer from '../reducer/productsReducer'
import { ChildrenType, ProductType } from '../types'
import { customFetch } from '../utils/customFetch'

type ProductsContextType = {
  getSingleProduct: (url: string) => void
  clearSingleProduct: () => void
  getAllProducts: () => void
  products: ProductType[] | null
  productsLoading: boolean
  productsError: boolean
  featuredProducts: ProductType[]
  singleProduct: ProductType
  singleProductError: boolean
  singleProductLoading: boolean
}

const ProductsContext = createContext<ProductsContextType | null>(null)

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProduct: {},
  singleProductError: false,
  singleProductLoading: true,
}

export const ProductsProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  const getAllProducts = async () => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' })

    try {
      const response = await customFetch.get('/products')
      const products = response.data
      dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: products })
    } catch (error) {
      dispatch({ type: 'GET_PRODUCTS_ERROR' })
    }
  }

  const getSingleProduct = async (url: string) => {
    dispatch({ type: 'GET_SINGLE_PRODUCT_BEGIN' })
    try {
      const response = await customFetch.get(`/products/${url}`)
      const singleProduct = response.data
      dispatch({ type: 'GET_SINGLE_PRODUCT_SUCCESS', payload: singleProduct })
    } catch (error) {
      dispatch({ type: 'GET_SINGLE_PRODUCT_ERROR' })
    } finally {
      dispatch({ type: 'GET_SINGLE_PRODUCT_END' })
    }
  }

  const clearSingleProduct = () => {
    dispatch({ type: 'CLEAR_SINGLE_PRODUCT' })
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        getSingleProduct,
        clearSingleProduct,
        getAllProducts,
        ...state,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
