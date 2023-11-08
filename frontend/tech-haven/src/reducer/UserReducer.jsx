const UserReducer = (state, action) => {
  if (action.type === 'LOGIN_START') {
    return { ...state, loading: true, error: false }
  }

  if (action.type === 'LOGIN_ERROR') {
    return { ...state, loading: false, error: action.payload }
  }

  if (action.type === 'LOGIN') {
    return { ...state, loading: false, user: action.payload, error: false }
  }

  if (action.type === 'LOGOUT_USER') {
    return { ...state, user: null }
  }

  if (action.type === 'REGISTER_START') {
    return { ...state, loading: true }
  }

  if (action.type === 'REGISTER') {
    return { ...state, loading: false, error: false, user: action.payload }
  }

  if (action.type === 'REGISTER_ERROR') {
    return { ...state, loading: false, error: action.payload }
  }
  throw new Error(`Cannot find ${action.type} action type`)
}

export default UserReducer
