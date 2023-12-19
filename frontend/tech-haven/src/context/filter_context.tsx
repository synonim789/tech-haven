import { createContext, useContext, useEffect, useReducer } from 'react'
import FullscreenLoading from '../components/ui/FullscreenLoading'
import { useGetAllProducts } from '../features/products/useGetAllProducts'
import filterReducer from '../reducer/filterReducer'
import { ChildrenType, ProductType } from '../types'

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

type FilterContextType = {
  updateFilters: (
    event: React.SyntheticEvent<
      HTMLButtonElement | HTMLSelectElement | HTMLInputElement
    >
  ) => void
  clearFilters: () => void
  updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
  updatePagination: (e: React.SyntheticEvent<HTMLButtonElement>) => void
  setGridView: () => void
  setListView: () => void
  getProducts: (data: Array<ProductType>) => void
  filters: {
    search: string
    category: string
    brand: string
    minPrice: number
    maxPrice: number
    rating: number
  }
  allProducts: ProductType[]
  pagedProducts: ProductType[]
  filteredProducts: ProductType[]
  limit: number
  currentPage: number
  listView: boolean
  gridView: boolean
}

const FilterContext = createContext<FilterContextType | null>(null)

export const FilterProvider = ({ children }: ChildrenType) => {
  const { data, isLoading, isSuccess } = useGetAllProducts()

  const [state, dispatch] = useReducer(filterReducer, initialState)

  const getProducts = () => {
    dispatch({ type: 'LOAD_PRODUCTS', payload: data })
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
    filterProducts()
    sortProducts()
    getPagination()
  }, [state.filters, state.sort, state.currentPage])

  const updateFilters = (
    event: React.SyntheticEvent<
      HTMLButtonElement | HTMLSelectElement | HTMLInputElement
    >
  ) => {
    let name = event.currentTarget.name
    let value: number | string = event.currentTarget.value

    if (name === 'category') {
      value = (event.currentTarget as HTMLButtonElement).textContent || ''
    }
    if (name === 'minPrice' || name === 'maxPrice') {
      value = value !== null ? Number(value) : 0
    }
    if (name === 'brand') {
      value = (event.currentTarget as HTMLInputElement).value
    }

    if (name === 'rating') {
      value = Number(value)
    }

    dispatch({ type: 'UPDATE_FILTERS', payload: { name, value } })
  }

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' })
  }

  const updateSort = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    let value = e.currentTarget.value
    dispatch({ type: 'UPDATE_SORT', payload: value })
  }

  const updatePagination = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    let value = e.currentTarget.textContent
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

  if (isLoading) {
    return <FullscreenLoading />
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
        getProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
