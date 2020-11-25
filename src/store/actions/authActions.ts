import { BaseResponse } from "../entities/BaseResponse";
import { User } from "../entities/User";
import { SET_ERROR_MESSAGE, SET_IS_LOADING, SIGN_UP_REQUEST, SIGN_UP_RESPONSE } from "../types/authTypes";

export const setIsLoading = (isLoading: boolean) => ({
  type: SET_IS_LOADING,
  payload: isLoading
});

export const setErrorMessage = (errorMessage: string) => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMessage
});

export const signUpRequest = (user: User) => ({
    type: SIGN_UP_REQUEST,
    payload: user,
  });

export const signUpResponse = (result: BaseResponse) => ({
    type: SIGN_UP_RESPONSE,
    result: result,
  });

