type reducerAction = {
  type: string
  payload?: any
}

type reducerState = {
  categories: []
  categoryLoading: boolean
  categoryError: boolean
  addProductError: boolean
  addProductLoading: boolean
  addProductSuccess: boolean
  deleteProductLoading: boolean
  deleteProductError: boolean
  deleteProductSuccess: boolean
}

const AdminReducer = (state: reducerState, action: reducerAction) => {
  if (action.type === 'GET_CATEGORIES_START') {
    return { ...state, categoryLoading: true, categoryError: false }
  }

  if (action.type === 'GET_CATEGORIES_SUCCESS') {
    return {
      ...state,
      categories: action.payload,
      categoryLoading: false,
      categoryError: false,
    }
  }
  if (action.type === 'GET_CATEGORIES_ERROR') {
    return { ...state, categoryLoading: false, categoryError: true }
  }

  if (action.type === 'ADD_PRODUCT_START') {
    return { ...state, addProductLoading: true, addProductError: false }
  }

  if (action.type === 'ADD_PRODUCT_ERROR') {
    return { ...state, addProductLoading: false, addProductError: true }
  }

  if (action.type === 'ADD_PRODUCT_SUCCESS') {
    return {
      ...state,
      addProductLoading: false,
      addProductError: false,
      addProductSuccess: true,
      deleteProductSuccess: false,
    }
  }

  if (action.type === 'DELETE_PRODUCT_START') {
    return { ...state, deleteProductLoading: true, deleteProductError: false }
  }

  if (action.type === 'DELETE_PRODUCT_SUCCESS') {
    return {
      ...state,
      deleteProductLoading: false,
      deleteProductError: false,
      deleteProductSuccess: true,
    }
  }

  if (action.type === 'DELETE_PRODUCT_ERROR') {
    return {
      ...state,
      deleteProductLoading: false,
      deleteProductError: action.payload,
      deleteProductSuccess: false,
    }
  }
  throw new Error(`Cannot find ${action.type} action type`)
}

export default AdminReducer
