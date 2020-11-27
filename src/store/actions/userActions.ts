import { BaseResponse } from "../entities/BaseResponse";
import { User } from "../entities/User";
import { DELETE_USER_REQUEST, DELETE_USER_RESPONSE, GET_USER_LIST_REQUEST, GET_USER_LIST_RESPONSE, INIT_USER_REQ_STATE, UPDATE_USER_REQUEST, UPDATE_USER_RESPONSE } from "../types/userTypes";

/**
 * INITIALIZE STATE FOR user REQUEST 
 */
export const initUserReqState = () => ({
  type: INIT_USER_REQ_STATE
});

/** 
 * UPDATE SERVICE
 * */ 
export const updateUserRequest = (user: User) => ({
  type: UPDATE_USER_REQUEST,
  payload: user,
});
export const updateUserResponse = (response: BaseResponse) => ({
  type: UPDATE_USER_RESPONSE,
  payload: response,
});

/** 
 * DELETE SERVICE
 * */ 
export const deleteUserRequest = (user: User) => ({
  type: DELETE_USER_REQUEST,
  payload: user,
});
export const deleteUserResponse = (response: BaseResponse) => ({
  type: DELETE_USER_RESPONSE,
  payload: response,
});

/** 
 * GET USER LIST
 * */ 
export const getUserListRequest = () => 
  ({
    type: GET_USER_LIST_REQUEST
  });
  
export const getUserListResponse = (response: BaseResponse) => ({
  type: GET_USER_LIST_RESPONSE,
  payload: response,
});