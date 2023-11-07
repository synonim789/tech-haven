const UserReducer = (state, action) => {
  if (action.type === 'LOGIN_START') {
    return { ...state, loading: true, error: false }
  }

  if (action.type === 'LOGIN_ERROR') {
    return { ...state, loading: false, error: action.payload }
  }

  if (action.type === 'LOGIN') {
    return { ...state, loading: false, user: action.payload }
  }

  throw new Error(`Cannot find ${action.type} action type`)
}

export default UserReducer
