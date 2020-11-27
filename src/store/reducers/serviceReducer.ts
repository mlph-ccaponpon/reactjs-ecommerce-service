import { CREATE_SERVICE_RESPONSE, INIT_SERVICE_REQ_STATE, GET_SERVICE_LIST_RESPONSE, GET_SERVICE_BY_ID_RESPONSE, UPDATE_SERVICE_RESPONSE } from "../types/serviceTypes"
import { Service } from "../entities/Service";

const initialState = {
    isServiceLoading: false,
    isServiceReqSuccess: false,
    serviceErrorMessage: "",
    serviceList: <Service[]> [],
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
        case UPDATE_SERVICE_RESPONSE: {
          const updatedService = action.payload.result;
          const index = state.serviceList.findIndex(s => s.id === updatedService.id );
          state.serviceList[index] = updatedService;

          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage}
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
