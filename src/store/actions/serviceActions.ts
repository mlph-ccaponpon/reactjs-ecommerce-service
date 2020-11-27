import { BaseResponse } from "../entities/BaseResponse";
import { Service } from "../entities/Service";
import { CREATE_SERVICE_REQUEST, CREATE_SERVICE_RESPONSE, SEARCH_SERVICE_REQUEST, SEARCH_SERVICE_RESPONSE, INIT_SERVICE_REQ_STATE } from "../types/serviceTypes";

/**
 * INITIALIZE STATE FOR SERVICE REQUEST 
 */
export const initServiceReqState = () => ({
  type: INIT_SERVICE_REQ_STATE
});

/** 
 * CREATE SERVICE
 * */ 
export const createServiceRequest = (service: Service) => ({
  type: CREATE_SERVICE_REQUEST,
  payload: service,
});
export const createServiceResponse = (response: BaseResponse) => ({
  type: CREATE_SERVICE_RESPONSE,
  payload: response,
});


/** 
 * SEARCH SERVICE
 * */ 
export const searchServiceRequest = (service?: Service) => 
  ({
    type: SEARCH_SERVICE_REQUEST,
    payload: service
  });
  
export const searchServiceResponse = (response: BaseResponse) => ({
  type: SEARCH_SERVICE_RESPONSE,
  payload: response,
});