type reducerAction = {
  type: string
  payload?: any
}

type reducerState = {
  categories: []
  categoryLoading: boolean
  categoryError: boolean | string
  addProductError: boolean | string
  addProductLoading: boolean
  addProductSuccess: boolean
  deleteProductLoading: boolean
  deleteProductError: boolean | string
  deleteProductSuccess: boolean
  editProductError: boolean | string
  editProductLoading: boolean
  editProductSuccess: boolean
  addCategorySuccess: boolean
  addCategoryLoading: boolean
  addCategoryError: boolean | string
  deleteCategoryLoading: boolean
  deleteCategoryError: boolean | string
  deleteCategorySuccess: boolean | null
  editCategorySuccess: boolean
  editCategoryError: boolean | string
  EditCategoryLoading: boolean
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

  if (action.type === 'EDIT_PRODUCT_START') {
    return { ...state, editProductLoading: true, editProductError: false }
  }

  if (action.type === 'EDIT_PRODUCT_ERROR') {
    return {
      ...state,
      editProductLoading: false,
      editProductError: action.payload,
    }
  }

  if (action.type === 'EDIT_PRODUCT_SUCCESS') {
    return {
      ...state,
      editProductSuccess: true,
      editProductLoading: false,
      editProductError: false,
    }
  }

  if (action.type === 'ADD_CATEGORY_START') {
    return {
      ...state,
      addCategoryLoading: true,
      addCategoryError: false,
      addCategorySuccess: false,
    }
  }

  if (action.type === 'ADD_CATEGORY_SUCCESS') {
    return {
      ...state,
      addCategorySuccess: true,
      addCategoryLoading: false,
      addCategoryError: false,
    }
  }

  if (action.type === 'ADD_CATEGORY_ERROR') {
    return {
      ...state,
      addCategoryError: action.payload,
      addCategoryLoading: false,
    }
  }

  if (action.type === 'DELETE_CATEGORY_START') {
    return {
      ...state,
      deleteCategoryLoading: true,
      deleteCategoryError: false,
      deleteCategorySuccess: false,
    }
  }

  if (action.type === 'DELETE_CATEGORY_SUCCESS') {
    return {
      ...state,
      deleteCategorySuccess: true,
      deleteCategoryLoading: false,
    }
  }

  if (action.type === 'DELETE_CATEGORY_ERROR') {
    return {
      ...state,
      deleteCategoryLoading: false,
      deleteCategoryError: action.payload,
    }
  }

  if (action.type === 'EDIT_CATEGORY_START') {
    return {
      ...state,
      editCategoryLoading: true,
      editCategoryError: false,
      editCategorySuccess: false,
    }
  }

  if (action.type === 'EDIT_CATEGORY_SUCCESS') {
    return {
      ...state,
      editCategoryLoading: false,
      editCategorySuccess: true,
      editCategoryError: false,
    }
  }

  if (action.type === 'EDIT_CATEGORY_ERROR') {
    return {
      ...state,
      editCategoryLoading: false,
      editCategoryError: action.payload,
      editCategorySuccess: false,
    }
  }

  throw new Error(`Cannot find ${action.type} action type`)
}

export default AdminReducer
