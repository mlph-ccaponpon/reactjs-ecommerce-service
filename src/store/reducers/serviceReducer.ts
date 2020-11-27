import { CREATE_SERVICE_RESPONSE, SET_IS_SERVICE_LOADING, SET_SERVICE_ERROR_MESSAGE } from "../types/serviceTypes"

const initialState = {
    isServiceLoading: false,
    isServiceRequestSuccess: false,
    serviceErrorMessage: "",
    currentService: {}
}

export function serviceReducer(state = initialState, action: any) {
    switch(action.type){
        case SET_IS_SERVICE_LOADING: {
            return {...state,
                isServiceLoading: action.payload}
        }
        case SET_SERVICE_ERROR_MESSAGE: {
            return {...state,
                serviceErrorMessage: action.payload}
        }
        case CREATE_SERVICE_RESPONSE: {
          return {...state, 
                isServiceLoading: false,
                isServiceRequestSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage}
        }
        default:
          return state
    }
}
