const UserReducer = (state, action) => {
  if (action.type === 'GET_USER_START') {
    return { ...state, userLoading: true, userError: false }
  }

  if (action.type === 'GET_USER_SUCCESS') {
    return {
      ...state,
      user: action.payload,
      userError: false,
      userLoading: false,
    }
  }
  if (action.type === 'GET_USER_ERROR') {
    return { ...state, userError: action.payload }
  }
  if (action.type === 'CLEAR_USER') {
    return { ...state, user: null }
  }

  if (action.type === 'DELETE_USER_START') {
    return { ...state, deleteUserLoading: true, deleteUserError: false }
  }

  if (action.type === 'DELETE_USER_SUCCESS') {
    return {
      ...state,
      user: null,
      deleteUserError: false,
      deleteUserLoading: false,
    }
  }

  if (action.type === 'DELETE_USER_ERROR') {
    return {
      ...state,
      deleteUserLoading: false,
      deleteUserError: action.payload,
    }
  }
  throw new Error(`Cannot find ${action.type} action type`)
}

export default UserReducer
