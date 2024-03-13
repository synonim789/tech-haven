import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductType } from '../../types'

type initialStateType = {
  allProducts: ProductType[]
  filters: {
    search: string
    category: string
    brand: string
    minPrice: number
    maxPrice: number
    rating: number
    [key: string]: string | number
  }
  limit: number
  currentPage: number
  gridView: boolean
  listView: boolean
  filteredProducts: ProductType[]
  pagedProducts: ProductType[]
  sort: string
}

const initialState: initialStateType = {
  allProducts: [],
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
  gridView: true,
  listView: false,
  filteredProducts: [],
  pagedProducts: [],
  sort: 'name-asc',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload
      state.filteredProducts = action.payload
    },
    updateFilter: (
      state,
      action: PayloadAction<{
        name: string
        value: string | number
      }>
    ) => {
      const { name, value } = action.payload
      state.filters[name] = value
    },
    filterProducts: (state) => {
      const { allProducts } = state
      const { search, category, brand, minPrice, maxPrice, rating } =
        state.filters
      let filteredProducts = allProducts
      if (search) {
        filteredProducts = filteredProducts.filter((product: ProductType) =>
          product.name.toLowerCase().startsWith(search)
        )
      }
      if (category !== 'all') {
        filteredProducts = filteredProducts.filter(
          (product: ProductType) => product.category.name === category
        )
      }
      if (brand !== 'all') {
        filteredProducts = filteredProducts.filter(
          (product: ProductType) => product.brand === brand
        )
      }
      if (rating >= 1 && rating <= 5) {
        filteredProducts = filteredProducts.filter(
          (product: ProductType) => product.rating >= rating
        )
      }
      state.filteredProducts = filteredProducts
    },
    clearFilters: (state) => {
      state.filters.category = 'all'
      state.filters.brand = 'all'
      state.filters.rating = 1
      state.filters.search = ''
    },

    setView: (state, action: PayloadAction<boolean>) => {
      const limit = action.payload ? 9 : 4
      const currentView = action.payload ? 'gridView' : 'listView'
      const indexOfLastProduct = state.currentPage * limit
      const indexOfFirstProduct = indexOfLastProduct - limit
      const currentProducts = state.filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      )
      state.pagedProducts = currentProducts
      state[`${currentView}`] = true
      state[currentView === 'gridView' ? 'listView' : 'gridView'] = false
      state.currentPage = 1
      state.limit = limit
    },

    getPagination: (state) => {
      const { currentPage, filteredProducts } = state

      const indexOfLastProduct = currentPage * state.limit
      const indexOfFirstProduct = indexOfLastProduct - state.limit
      const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      )
      state.pagedProducts = currentProducts
    },
    updatePagination: (state, action) => {
      state.currentPage = Number(action.payload)
    },
    updateSort: (state, action) => {
      state.sort = action.payload
    },
    sortProducts: (state) => {
      const { sort, filteredProducts } = state
      let sortedProducts: ProductType[] = []
      if (sort === 'name-asc') {
        sortedProducts = filteredProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-desc') {
        sortedProducts = filteredProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      if (sort === 'price-asc') {
        sortedProducts = filteredProducts.sort((a, b) => {
          return a.price - b.price
        })
      }

      if (sort === 'price-desc') {
        sortedProducts = filteredProducts.sort((a, b) => {
          return b.price - a.price
        })
      }
      state.filteredProducts = sortedProducts
    },
  },
})

export const {
  updateFilter,
  clearFilters,
  setAllProducts,
  getPagination,
  updatePagination,
  filterProducts,
  updateSort,
  sortProducts,
  setView,
} = filterSlice.actions

export default filterSlice.reducer
