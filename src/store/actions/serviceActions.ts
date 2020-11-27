import { Service } from "../entities/Service";
import { CREATE_SERVICE_REQUEST, CREATE_SERVICE_RESPONSE } from "../types/serviceTypes";

/** 
 * CREATE SERVICE
 * */ 
export const createServiceRequest = (service: Service) => ({
  type: CREATE_SERVICE_REQUEST,
  payload: service,
});
export const createServiceResponse = (service: Service) => ({
  type: CREATE_SERVICE_RESPONSE,
  payload: service,
});