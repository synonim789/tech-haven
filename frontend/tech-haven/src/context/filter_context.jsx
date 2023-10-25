import { createContext, useContext, useEffect, useReducer } from 'react'
import { useProductsContext } from './products_context'
import filterReducer from '../reducer/filterReducer'

const initialState = {
  allProducts: [],
  filteredProducts: [],
  sort: 'name-asc',
  filters: {
    search: '',
    category: 'all',
    brand: 'all',
    minPrice: 0,
    maxPrice: 0,
    rating: 1,
  },
}

const FilterContext = createContext()
export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(filterReducer, initialState)

  const getProducts = () => {
    dispatch({ type: 'LOAD_PRODUCTS', payload: products })
  }

  const filterProducts = () => {
    dispatch({ type: 'FILTER_PRODUCTS' })
  }

  const sortProducts = () => {
    dispatch({ type: 'SORT_PRODUCTS' })
  }

  useEffect(() => {
    getProducts()
  }, [products])

  useEffect(() => {
    filterProducts()
    sortProducts()
  }, [state.filters, state.sort])

  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'minPrice' || name === 'maxPrice') {
      value = Number(value)
    }
    if (name === 'rating') {
      value = e.target.value
    }

    if (name === 'rating') {
      value = Number(value)
    }

    dispatch({ type: 'UPDATE_FILTERS', payload: { name, value } })
  }

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' })
  }

  const updateSort = (e) => {
    let value = e.target.value
    dispatch({ type: 'UPDATE_SORT', payload: value })
  }
  return (
    <FilterContext.Provider
      value={{ ...state, updateFilters, clearFilters, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
