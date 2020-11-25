import { SET_ERROR_MESSAGE, SET_IS_LOADING, SIGN_UP_RESPONSE } from "../types/authTypes"

const initialState = {
    isLoading: false,
    success: false,
    errorMessage: ""
}

export function authReducer(state = initialState, action: any) {
    switch(action.type){
        case SIGN_UP_RESPONSE: {
          return {...state, 
                  isLoading: false,
                  success: action.result.success, 
                  errorMessage: action.result.errorMessage}
        }
        case SET_IS_LOADING: {
            return {...state,
                    isLoading: action.payload}
        }
        case SET_ERROR_MESSAGE: {
            return {...state,
                    errorMessage: action.payload}
        }
        default:
          return state
    }
}
