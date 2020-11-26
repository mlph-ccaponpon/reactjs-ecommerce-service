import { LOGIN_RESPONSE, LOGOUT_RESPONSE, SET_ERROR_MESSAGE, SET_IS_LOADING, SET_IS_LOADING_PAGE } from "../types/authTypes"

const initialState = {
    currentUserId: "",
    isLoggedIn: false,
    isLoading: false,
    isLoadingPage: true,
    errorMessage: ""
}

export function authReducer(state = initialState, action: any) {
    switch(action.type){
        case SET_IS_LOADING: {
            return {...state,
                    isLoading: action.payload}
        }
        case SET_IS_LOADING_PAGE: {
            return {...state,
                    isLoadingPage: action.payload}
        }
        case SET_ERROR_MESSAGE: {
            return {...state,
                    errorMessage: action.payload}
        }
        case LOGIN_RESPONSE: {
          return {...state, 
                  isLoading: false,
                  isLoggedIn: action.payload.success, 
                  errorMessage: action.payload.errorMessage}
        }
        case LOGOUT_RESPONSE: {
            return {...state, 
                    isLoading: false,
                    isLoggedIn: !action.payload.success, 
                    errorMessage: action.payload.errorMessage}
        }
        default:
          return state
    }
}
