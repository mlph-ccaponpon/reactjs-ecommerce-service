import { INIT_AUTH_REQ_STATE, LOGIN_RESPONSE, LOGOUT_RESPONSE, SET_AUTH_ERROR_MESSAGE, SET_IS_LOADING_PAGE } from "../types/authTypes"

const initialState = {
    currentUserId: "",
    isLoggedIn: false,
    isLoading: false,
    isLoadingPage: true,
    authErrorMessage: "",
    currUser: null
}

export function authReducer(state = initialState, action: any) {
    switch(action.type){
        case INIT_AUTH_REQ_STATE: {
          return {...state, 
                isLoading: true,
                authErrorMessage: ""}
        }
        case SET_IS_LOADING_PAGE: {
            return {...state,
                    isLoadingPage: action.payload}
        }
        case SET_AUTH_ERROR_MESSAGE: {
            return {...state,
                    authErrorMessage: action.payload}
        }
        case LOGIN_RESPONSE: {
          const currUser = action.payload.result;
          return {...state, 
                  isLoading: false,
                  isLoggedIn: action.payload.success, 
                  authErrorMessage: action.payload.errorMessage,
                  currUser: currUser}
        }
        case LOGOUT_RESPONSE: {
            const currUser = action.payload.result;
            return {...state, 
                    isLoading: false,
                    isLoggedIn: !action.payload.success,
                    authErrorMessage: action.payload.errorMessage,
                    currUser: currUser}
        }
        default:
          return state
    }
}
