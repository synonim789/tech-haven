const productsReducer = (state, action) => {
  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return { ...state, productsLoading: true }
  }

  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    const featuredProducts = action.payload
      .filter((product) => product.isFeatured === true)
      .slice(0, 3)
    return {
      ...state,
      productsLoading: false,
      products: action.payload,
      featuredProducts,
    }
  }

  if (action.type === 'GET_PRODUCTS_ERROR') {
    return { ...state, productsLoading: false, productsError: true }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_BEGIN') {
    return { ...state, singleProductLoading: true }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_SUCCESS') {
    return {
      ...state,
      singleProductLoading: false,
      singleProduct: action.payload,
    }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_ERROR') {
    return { ...state, singleProductLoading: false, singleProductError: true }
  }

  if (action.type === 'CLEAR_SINGLE_PRODUCT') {
    return { ...state, singleProduct: {} }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default productsReducer
