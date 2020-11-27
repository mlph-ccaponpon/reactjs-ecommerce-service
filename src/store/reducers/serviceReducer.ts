import { CREATE_SERVICE_RESPONSE, INIT_SERVICE_REQ_STATE, GET_SERVICE_LIST_RESPONSE, GET_SERVICE_BY_ID_RESPONSE } from "../types/serviceTypes"

const initialState = {
    isServiceLoading: false,
    isServiceReqSuccess: false,
    serviceErrorMessage: "",
    serviceList: [],
    selectedService: null
}

export function serviceReducer(state = initialState, action: any) {
    switch(action.type){
        case INIT_SERVICE_REQ_STATE: {
          return {...state, 
                isServiceLoading: true,
                isServiceReqSuccess: false,
                serviceErrorMessage: "",
                selectedService: null}
        }
        case CREATE_SERVICE_RESPONSE: {
          const createdService = action.payload.result;
          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage,
                serviceList: [createdService,...state.serviceList]}
        }
        case GET_SERVICE_LIST_RESPONSE: {
          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage,
                serviceList: action.payload.result}
        }
        case GET_SERVICE_BY_ID_RESPONSE: {
          const service = action.payload.result;
          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage,
                selectedService: service}
        }
        default:
          return state
    }
}
