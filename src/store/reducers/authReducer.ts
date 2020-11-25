import { LOGIN_RESPONSE, SET_ERROR_MESSAGE, SET_IS_LOADING, SIGN_UP_RESPONSE } from "../types/authTypes"

const initialState = {
    currentUserId: "",
    isLoggedIn: false,
    isLoading: false,
    errorMessage: ""
}

export function authReducer(state = initialState, action: any) {
    switch(action.type){
        case SET_IS_LOADING: {
            return {...state,
                    isLoading: action.payload}
        }
        case SET_ERROR_MESSAGE: {
            return {...state,
                    errorMessage: action.payload}
        }
        case SIGN_UP_RESPONSE:
        case LOGIN_RESPONSE: {
          return {...state, 
                  isLoading: false,
                  isLoggedIn: action.payload.success, 
                  errorMessage: action.payload.errorMessage}
        }
        default:
          return state
    }
}
