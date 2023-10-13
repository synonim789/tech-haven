import axios from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [productsContextState, setProductsContextState] = useState({
    isLoading: false,
    isError: null,
    products: [],
    featuredProducts: [],
  })

  const getAllProducts = async () => {
    setProductsContextState({ ...productsContextState, isLoading: true })
    try {
      const response = await axios.get('http://localhost:3000/api/v1/products')
      const products = response.data
      setProductsContextState({
        ...productsContextState,
        isLoading: false,
        isError: false,
        products: products,
        featuredProducts: products.find(
          (product) => product.isFeatured === true
        ),
      })
    } catch (error) {
      setProductsContextState({ ...productsContextState, isError: true })
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <ProductsContext.Provider value={productsContextState}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
