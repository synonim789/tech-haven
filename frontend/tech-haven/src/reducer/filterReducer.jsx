const filterReducer = (state, action) => {
  if (action.type === 'LOAD_PRODUCTS') {
    let maxPrice = action.payload.map((product) => product.price)
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
        (product) => product.rating > 1
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
}
export default filterReducer
