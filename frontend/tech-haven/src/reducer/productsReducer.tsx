import { ProductType } from '../types'

type ProductsActionType = {
  type: string
  payload?: any
}

type ProductsStateType = {
  productsLoading: boolean
  productsError: boolean
  products: ProductType[]
  featuredProducts: ProductType[]
  singleProduct: ProductType
  singleProductError: boolean
  singleProductLoading: boolean
}

const productsReducer = (
  state: ProductsStateType,
  action: ProductsActionType
) => {
  if (action.type === 'GET_PRODUCTS_BEGIN') {
    return { ...state, productsLoading: true }
  }

  if (action.type === 'GET_PRODUCTS_SUCCESS') {
    const featuredProducts = action.payload
      .filter((product: ProductType) => product.isFeatured === true)
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
      singleProductError: false,
      singleProduct: action.payload,
    }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_ERROR') {
    return { ...state, singleProductLoading: false, singleProductError: true }
  }

  if (action.type === 'CLEAR_SINGLE_PRODUCT') {
    return { ...state, singleProduct: {} }
  }

  if (action.type === 'GET_SINGLE_PRODUCT_END') {
    return { ...state, singleProductLoading: false }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default productsReducer
