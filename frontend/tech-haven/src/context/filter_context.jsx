import { createContext, useContext, useEffect, useReducer } from 'react'
import filterReducer from '../reducer/filterReducer'
import { useProductsContext } from './products_context'

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
  limit: 9,
  currentPage: 1,
  pagedProducts: [],
  gridView: true,
  listView: false,
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

  const getPagination = () => {
    dispatch({ type: 'GET_PAGINATION' })
  }

  useEffect(() => {
    getProducts()
  }, [products])

  useEffect(() => {
    filterProducts()
    sortProducts()
    getPagination()
  }, [state.filters, state.sort, state.currentPage])

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

  const updatePagination = (e) => {
    let value = e.target.textContent
    dispatch({ type: 'UPDATE_PAGINATION', payload: value })
  }

  const setGridView = () => {
    dispatch({ type: 'UPDATE_LIMIT', payload: 9 })
    dispatch({ type: 'SET_GRID_VIEW' })
  }

  const setListView = () => {
    dispatch({ type: 'UPDATE_LIMIT', payload: 4 })
    dispatch({ type: 'SET_LIST_VIEW' })
  }
  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateFilters,
        clearFilters,
        updateSort,
        updatePagination,
        setGridView,
        setListView,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
