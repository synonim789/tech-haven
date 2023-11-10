const AuthReducer = (state, action) => {
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
      token: action.payload,
      loggingError: false,
    }
  }

  if (action.type === 'LOGOUT_USER') {
    return { ...state, token: undefined }
  }

  if (action.type === 'REGISTER_START') {
    return { ...state, signingLoading: true, signingError: false }
  }

  if (action.type === 'REGISTER') {
    return {
      ...state,
      signingLoading: false,
      signingError: false,
      token: action.payload,
    }
  }

  if (action.type === 'REGISTER_ERROR') {
    return { ...state, signingLoading: false, signingError: action.payload }
  }

  if (action.type === 'FORGOT_PASSWORD_START') {
    return { ...state, forgotLoading: true, forgotError: false }
  }

  if (action.type === 'FORGOT_PASSWORD_ERROR') {
    return { ...state, forgotError: true, forgotLoading: false }
  }

  if (action.type === 'FORGOT_PASSWORD_SUCCESS') {
    return { ...state, forgotError: false, forgotLoading: false }
  }
  throw new Error(`Cannot find ${action.type} action type`)
}

export default AuthReducer
