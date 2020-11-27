import { BaseResponse } from "../entities/BaseResponse";
import { User } from "../entities/User";
import { UserCredential } from "../entities/UserCredential";
import { AUTH_CHANNEL_REQUEST, INIT_AUTH_REQ_STATE, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE, SET_AUTH_ERROR_MESSAGE, SET_IS_LOADING_PAGE, SIGN_UP_REQUEST } from "../types/authTypes";

/**
 * SET IS LOADING PAGE
 */
export const setIsLoadingPage = (isLoadingPage: boolean) => ({
  type: SET_IS_LOADING_PAGE,
  payload: isLoadingPage
});

/**
 * SET ERROR MESSAGE
 */
export const setAuthErrorMessage = (errorMessage: string) => ({
  type: SET_AUTH_ERROR_MESSAGE,
  payload: errorMessage
});

/**
 * INITIALIZE STATE FOR AUTH REQUEST 
 */
export const initAuthReqState = () => ({
  type: INIT_AUTH_REQ_STATE
});

/**
 * AUTH CHANNEL
 */
export const authChannelRequest = () => ({
  type: AUTH_CHANNEL_REQUEST
});

/** 
 * SIGN UP
 * */ 
export const signUpRequest = (user: User) => ({
  type: SIGN_UP_REQUEST,
  payload: user,
});


/** 
 * LOGIN
 * */ 
export const loginRequest = (userCredential: UserCredential) => ({
  type: LOGIN_REQUEST,
  payload: userCredential,
});

export const loginResponse = (response: BaseResponse<User | null>) => ({
  type: LOGIN_RESPONSE,
  payload: response,
});


/**
 * LOGOUT
 */
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const logoutResponse = (response: BaseResponse<User | null>) => ({
  type: LOGOUT_RESPONSE,
  payload: response,
});


