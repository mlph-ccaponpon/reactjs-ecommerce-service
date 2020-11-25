import { BaseResponse } from "../entities/BaseResponse";
import { User } from "../entities/User";
import { UserCredential } from "../entities/UserCredential";
import { AUTH_CHANNEL_REQUEST, AUTH_CHANNEL_RESPONSE, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE, SET_ERROR_MESSAGE, SET_IS_LOADING, SIGN_UP_REQUEST, SIGN_UP_RESPONSE } from "../types/authTypes";

export const setIsLoading = (isLoading: boolean) => ({
  type: SET_IS_LOADING,
  payload: isLoading
});

export const setErrorMessage = (errorMessage: string) => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMessage
});

/** 
 * SIGN UP
 * */ 
export const signUpRequest = (user: User) => ({
  type: SIGN_UP_REQUEST,
  payload: user,
});

export const signUpResponse = (response: BaseResponse) => ({
  type: SIGN_UP_RESPONSE,
  payload: response,
});


/** 
 * LOGIN
 * */ 
export const loginRequest = (userCredential: UserCredential) => ({
  type: LOGIN_REQUEST,
  payload: userCredential,
});

export const loginResponse = (response: BaseResponse) => ({
  type: LOGIN_RESPONSE,
  payload: response,
});


/**
 * LOGOUT
 */
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});

export const logoutResponse = (response: BaseResponse) => ({
  type: LOGOUT_RESPONSE,
  payload: response,
});

/**
 * AUTH CHANNEL
 */
export const authChannelRequest = () => ({
  type: AUTH_CHANNEL_REQUEST
});

export const authChannelResponse = (response: BaseResponse) => ({
  type: AUTH_CHANNEL_RESPONSE,
  payload: response,
});

