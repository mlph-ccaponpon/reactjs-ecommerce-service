import { fork } from "redux-saga/effects";
import { loginWatcher, signUpWatcher } from "./authSaga";

export function* rootSaga() {
    /**
     * Auth Saga
     */
    yield fork(signUpWatcher);
    yield fork(loginWatcher);
    
}