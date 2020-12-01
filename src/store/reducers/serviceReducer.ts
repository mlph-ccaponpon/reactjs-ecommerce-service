import { CREATE_SERVICE_RESPONSE, INIT_SERVICE_REQ_STATE, GET_SERVICE_LIST_RESPONSE, GET_SERVICE_BY_ID_RESPONSE, UPDATE_SERVICE_RESPONSE, DELETE_SERVICE_RESPONSE, ADD_SERVICE_REVIEW_RESPONSE, SEARCH_SERVICE_REQUEST } from "../types/serviceTypes"
import { Service } from "../entities/Service";

const initialState = {
    isServiceLoading: false,
    isServiceReqSuccess: false,
    serviceErrorMessage: "",
    serviceList: <Service[]> [],
    filteredServiceList: <Service[]> [],
    selectedService: <Service> {}
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
          const createdService: Service  = action.payload.result;
          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage,
                serviceList: [createdService,...state.serviceList]}
        }
        case UPDATE_SERVICE_RESPONSE: {
          const updatedService: Service  = action.payload.result;
          const index = state.serviceList.findIndex(s => s.id === updatedService.id );
          state.serviceList[index] = updatedService;

          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage}
        }
        case DELETE_SERVICE_RESPONSE: {
          const deletedService: Service = action.payload.result;
          const index = state.serviceList.findIndex(s => s.id === deletedService.id );
          state.serviceList.splice(index, 1);

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
                serviceList: action.payload.result,
                filteredServiceList: action.payload.result}
        }
        case GET_SERVICE_BY_ID_RESPONSE: {
          const service: Service  = action.payload.result;
          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage,
                selectedService: service}
        }
        case ADD_SERVICE_REVIEW_RESPONSE: {
          const service: Service = action.payload.result;
          state.selectedService.rating = service.rating;
          state.selectedService.reviews = service.reviews;

          return {...state, 
                isServiceLoading: false,
                isServiceReqSuccess: action.payload.success,
                serviceErrorMessage: action.payload.errorMessage}
        }
        case SEARCH_SERVICE_REQUEST: {
            const filteredServices = action.payload;
            return{...state,
              filteredServiceList: filteredServices
            }
        }
        default:
          return state
    }
}
