import { BaseResponse } from "../entities/BaseResponse";
import { Service } from "../entities/Service";
import { ServiceReview } from "../entities/ServiceReview";
import { ADD_SERVICE_REVIEW_REQUEST, ADD_SERVICE_REVIEW_RESPONSE, CREATE_SERVICE_REQUEST, CREATE_SERVICE_RESPONSE, DELETE_SERVICE_REQUEST, DELETE_SERVICE_RESPONSE, GET_SERVICE_BY_ID_REQUEST, GET_SERVICE_BY_ID_RESPONSE, GET_SERVICE_LIST_REQUEST, GET_SERVICE_LIST_RESPONSE, INIT_SERVICE_REQ_STATE, SEARCH_SERVICE_REQUEST, UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_RESPONSE } from "../types/serviceTypes";

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
 * DELETE SERVICE
 * */ 
export const deleteServiceRequest = (service: Service) => ({
  type: DELETE_SERVICE_REQUEST,
  payload: service,
});
export const deleteServiceResponse = (response: BaseResponse) => ({
  type: DELETE_SERVICE_RESPONSE,
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

/** 
 * ADD SERVICE REVIEW
 * */ 
export const addServiceReviewRequest = (service: Service, review: ServiceReview) => ({
  type: ADD_SERVICE_REVIEW_REQUEST,
  payload: {service, review},
});
export const addServiceReviewResponse = (response: BaseResponse) => ({
  type: ADD_SERVICE_REVIEW_RESPONSE,
  payload: response
});


/** 
 * SEARCH SERVICE
 * */ 
export const searchServiceRequest = (filteredServices: Service[]) => 
  ({
    type: SEARCH_SERVICE_REQUEST,
    payload: filteredServices
  });