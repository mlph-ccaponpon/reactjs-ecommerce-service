import { CREATE_SERVICE_RESPONSE, INIT_SERVICE_REQ_STATE, SEARCH_SERVICE_RESPONSE } from "../types/serviceTypes"

const initialState = {
    isServiceLoading: false,
    isServiceReqSuccess: false,
    serviceErrorMessage: "",
    serviceList: []
}

export function serviceReducer(state = initialState, action: any) {
    switch(action.type){
        case INIT_SERVICE_REQ_STATE: {
          return {...state, 
                isServiceLoading: true,
                isServiceReqSuccess: false,
                serviceErrorMessage: ""}
        }
        case CREATE_SERVICE_RESPONSE: {
          const createdService = action.payload.result;
          console.log(createdService);
          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage,
                serviceList: [createdService,...state.serviceList]}
        }
        case SEARCH_SERVICE_RESPONSE: {
          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage,
                serviceList: action.payload.result}
        }
        default:
          return state
    }
}
