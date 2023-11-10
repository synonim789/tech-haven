const UserReducer = (state, action) => {
  if (action.type === 'GET_USER_START') {
    return { ...state, loading: true, error: false }
  }

  if (action.type === 'GET_USER_SUCCESS') {
    return { ...state, loading: false, error: false, user: action.payload }
  }

  if (action.type === 'CLEAR_USER') {
    return { ...state, user: null }
  }
  throw new Error(`Cannot find ${action.type} action type`)
}

export default UserReducer
