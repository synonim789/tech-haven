const UserReducer = (state, action) => {
  if (action.type === 'GET_USER_START') {
    return { ...state, userLoading: true, userError: false }
  }

  if (action.type === 'GET_USER_SUCCESS') {
    return {
      ...state,
      userError: true,
      user: action.payload,
    }
  }
  if (action.type === 'GET_USER_ERROR') {
    return { ...state, userError: action.payload }
  }
  if (action.type === 'CLEAR_USER') {
    return { ...state, user: undefined, userLoading: false, userError: false }
  }

  if (action.type === 'GET_USER_LOADING_SUCCESS') {
    return { ...state, userLoading: false, userError: false }
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

  if (action.type === 'UPDATE_USER_START') {
    return { ...state, userUpdateLoading: true, userUpdateError: false }
  }
  if (action.type === 'UPDATE_USER_SUCCESS') {
    return {
      ...state,
      userUpdateLoading: false,
      userUpdateError: false,
      user: action.payload,
    }
  }
  if (action.type === 'UPDATE_USER_ERROR') {
    return { ...state, userUpdateLoading: false, userUpdateError: true }
  }
  throw new Error(`Cannot find ${action.type} action type`)
}

export default UserReducer
