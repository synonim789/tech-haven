import { createSlice } from '@reduxjs/toolkit'
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
    updateFilter: (state, action) => {
      const { name, value } = action.payload
      if (name === 'category') {
        state.filters.category = value
      }
      if (name === 'brand') {
        state.filters.brand = value
      }
      if (name === 'minPrice') {
        state.filters.minPrice = Number(value)
      }
      if (name === 'maxPrice') {
        state.filters.maxPrice = Number(value)
      }
      if (name === 'rating') {
        state.filters.rating = Number(value)
      }
      if (name === 'search') {
        state.filters.search = value
      }
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
      state.filters.minPrice = 0
    },
    setGridView: (state) => {
      const limit = 9
      const indexOfLastProduct = state.currentPage * limit
      const indexOfFirstProduct = indexOfLastProduct - limit
      const currentProducts = state.filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      )
      state.pagedProducts = currentProducts
      state.gridView = true
      state.listView = false
      state.currentPage = 1
      state.limit = limit
    },
    setListView: (state) => {
      const limit = 4
      const indexOfLastProduct = state.currentPage * limit
      const indexOfFirstProduct = indexOfLastProduct - limit
      const currentProducts = state.filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      )
      state.pagedProducts = currentProducts
      state.gridView = false
      state.listView = true
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
  setGridView,
  setListView,
  setAllProducts,
  getPagination,
  updatePagination,
  filterProducts,
  updateSort,
  sortProducts,
} = filterSlice.actions

export default filterSlice.reducer
