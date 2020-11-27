import { BaseResponse } from "../entities/BaseResponse";
import { Service } from "../entities/Service";
import { CREATE_SERVICE_REQUEST, CREATE_SERVICE_RESPONSE, SET_IS_SERVICE_LOADING, SET_SERVICE_ERROR_MESSAGE } from "../types/serviceTypes";

export const setIsServiceLoading = (isServiceLoading: boolean) => ({
  type: SET_IS_SERVICE_LOADING,
  payload: isServiceLoading
});

export const setServiceErrorMessage = (serviceErrorMessage: string) => ({
  type: SET_SERVICE_ERROR_MESSAGE,
  payload: serviceErrorMessage
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