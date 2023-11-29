import { ProductType } from '../types'

type FilterReducerActionType = {
  type: string
  payload?: any
}

type FilterReducerStateType = {
  allProducts: ProductType[]
  filteredProducts: ProductType[]
  sort: string
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
  pagedProducts: ProductType[]
  gridView: boolean
  listView: boolean
}

const filterReducer = (
  state: FilterReducerStateType,
  action: FilterReducerActionType
) => {
  if (action.type === 'LOAD_PRODUCTS') {
    let maxPrice = action.payload.map((product: ProductType) => product.price)
    maxPrice = Math.max(...maxPrice)
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: { ...state.filters, maxPrice },
    }
  }

  if (action.type === 'UPDATE_FILTERS') {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
      currentPage: 1,
    }
  }

  if (action.type === 'FILTER_PRODUCTS') {
    const { allProducts } = state
    const { search, category, brand, minPrice, maxPrice, rating } =
      state.filters
    let filteredProducts = [...allProducts]

    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().startsWith(search)
      )
    }

    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.name === category
      )
    }

    if (brand !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === brand
      )
    }

    if (rating === 5) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating === 5
      )
    }

    if (rating === 4) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating > 4
      )
    }
    if (rating === 3) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating > 3
      )
    }
    if (rating === 2) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating > 2
      )
    }
    if (rating === 1) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= 1
      )
    }
    filteredProducts = filteredProducts.filter(
      (product) => product.price > minPrice && product.price <= maxPrice
    )
    return { ...state, filteredProducts: filteredProducts }
  }

  if (action.type === 'CLEAR_FILTERS') {
    return {
      ...state,
      filters: {
        ...state.filters,
        category: 'all',
        brand: 'all',
        minPrice: 0,
        maxPrice: state.filters.maxPrice,
        rating: 1,
      },
    }
  }

  if (action.type === 'SORT_PRODUCTS') {
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
    return { ...state, filteredProducts: sortedProducts }
  }

  if (action.type === 'UPDATE_SORT') {
    return { ...state, sort: action.payload }
  }

  if (action.type === 'GET_PAGINATION') {
    const { currentPage, limit, filteredProducts } = state
    const indexOfLastProduct = currentPage * limit
    const indexOfFirstProduct = indexOfLastProduct - limit
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    )
    return { ...state, pagedProducts: currentProducts }
  }

  if (action.type === 'UPDATE_PAGINATION') {
    return { ...state, currentPage: action.payload }
  }

  if (action.type === 'SET_GRID_VIEW') {
    const { currentPage, limit, filteredProducts } = state
    const indexOfLastProduct = currentPage * limit
    const indexOfFirstProduct = indexOfLastProduct - limit
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    )
    return {
      ...state,
      gridView: true,
      listView: false,
      pagedProducts: currentProducts,
      currentPage: 1,
    }
  }

  if (action.type === 'UPDATE_LIMIT') {
    return { ...state, limit: action.payload }
  }

  if (action.type === 'SET_LIST_VIEW') {
    const { currentPage, limit, filteredProducts } = state
    const indexOfLastProduct = currentPage * limit
    const indexOfFirstProduct = indexOfLastProduct - limit
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    )
    return {
      ...state,
      gridView: false,
      listView: true,
      pagedProducts: currentProducts,
      currentPage: 1,
    }
  }
  throw new Error(`Cannot find ${action.type} action type`)
}
export default filterReducer
