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
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default productsReducer
