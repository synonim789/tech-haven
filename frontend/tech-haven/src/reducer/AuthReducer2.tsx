type stateType = {
  token: null | string
}

type actionType = {
  type: string
  payload?: any
}

const AuthReducer2 = (state: stateType, action: actionType) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    case 'CLEAR_TOKEN':
      return { ...state, token: null }
    default:
      throw new Error(`Cannot find ${action.type} action type`)
  }
}

export default AuthReducer2
