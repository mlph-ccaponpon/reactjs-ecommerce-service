import { fork } from "redux-saga/effects";
import { loginWatcher, logoutWatcher, onAuthChannelWatcher, signUpWatcher } from "./authSaga";

export function* rootSaga() {
    /**
     * Auth Saga
     */
    yield fork(signUpWatcher);
    yield fork(loginWatcher);
    yield fork(logoutWatcher);
    yield fork(onAuthChannelWatcher);
    
}