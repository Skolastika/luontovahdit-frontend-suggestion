import userService from '../services/userService'

const initialState = {
  isUserLoggedIn: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERLOGGEDIN':
      return {
        ...state,
        isUserLoggedIn: action.loggedIn
      }
    default:
      return state
  }
}

export const setUserLoggedIn = (loggedIn) => {
  return dispatch => {
    dispatch({
      type: 'SET_USERLOGGEDIN',
      loggedIn
    })
  }
}

export const checkUserSession = () => {
  return async dispatch => {
    try {
      await userService.getProfile()
      dispatch({
        type: 'SET_USERLOGGEDIN',
        loggedIn: true
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default userReducer