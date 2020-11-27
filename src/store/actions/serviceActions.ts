import { BaseResponse } from "../entities/BaseResponse";
import { Service } from "../entities/Service";
import { CREATE_SERVICE_REQUEST, CREATE_SERVICE_RESPONSE, GET_SERVICE_BY_ID_REQUEST, GET_SERVICE_BY_ID_RESPONSE, GET_SERVICE_LIST_REQUEST, GET_SERVICE_LIST_RESPONSE, INIT_SERVICE_REQ_STATE, UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_RESPONSE } from "../types/serviceTypes";

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
 * UPDATE SERVICE
 * */ 
export const updateServiceRequest = (service: Service) => ({
  type: UPDATE_SERVICE_REQUEST,
  payload: service,
});
export const updateServiceResponse = (response: BaseResponse) => ({
  type: UPDATE_SERVICE_RESPONSE,
  payload: response,
});


/** 
 * GET SERVICE LIST
 * */ 
export const getServiceListRequest = () => 
  ({
    type: GET_SERVICE_LIST_REQUEST
  });
  
export const getServiceListResponse = (response: BaseResponse) => ({
  type: GET_SERVICE_LIST_RESPONSE,
  payload: response,
});

/** 
 * GET SERVICE BY ID
 * */ 
export const getServiceByIdRequest = (serviceId: string) => 
  ({
    type: GET_SERVICE_BY_ID_REQUEST,
    payload: serviceId
  });
  
export const getServiceByIdResponse = (response: BaseResponse) => ({
  type: GET_SERVICE_BY_ID_RESPONSE,
  payload: response,
});