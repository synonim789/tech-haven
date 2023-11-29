type reducerAction = {
  type: string
  payload?: any
}

type reducerState = {
  categories: []
  categoryLoading: boolean
  categoryError: boolean
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
  throw new Error(`Cannot find ${action.type} action type`)
}

export default AdminReducer
