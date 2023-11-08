const UserReducer = (state, action) => {
  if (action.type === 'LOGIN_START') {
    return { ...state, loggingLoading: true, loggingError: false }
  }

  if (action.type === 'LOGIN_ERROR') {
    return { ...state, loggingLoading: false, loggingError: action.payload }
  }

  if (action.type === 'LOGIN') {
    return {
      ...state,
      loggingLoading: false,
      user: action.payload,
      loggingError: false,
    }
  }

  if (action.type === 'LOGOUT_USER') {
    return { ...state, user: null }
  }

  if (action.type === 'REGISTER_START') {
    return { ...state, signingLoading: true, signingError: false }
  }

  if (action.type === 'REGISTER') {
    return {
      ...state,
      signingLoading: false,
      signingError: false,
      user: action.payload,
    }
  }

  if (action.type === 'REGISTER_ERROR') {
    return { ...state, signingLoading: false, signingError: action.payload }
  }
  throw new Error(`Cannot find ${action.type} action type`)
}

export default UserReducer
