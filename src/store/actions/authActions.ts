import { BaseResponse } from "../entities/BaseResponse";
import { User } from "../entities/User";
import { UserCredential } from "../entities/UserCredential";
import { AUTH_CHANNEL_REQUEST, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT_REQUEST, LOGOUT_RESPONSE, SET_ERROR_MESSAGE, SET_IS_LOADING, SET_IS_LOADING_PAGE, SIGN_UP_REQUEST } from "../types/authTypes";

export const setIsLoading = (isLoading: boolean) => ({
  type: SET_IS_LOADING,
  payload: isLoading
});

export const setIsLoadingPage = (isLoadingPage: boolean) => ({
  type: SET_IS_LOADING_PAGE,
  payload: isLoadingPage
});

export const setErrorMessage = (errorMessage: string) => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMessage
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


