import { fork } from "redux-saga/effects";
import { loginWatcher, logoutWatcher, onAuthChannelWatcher, signUpWatcher } from "./authSaga";
import { createServiceWatcher, getServiceByIdWatcher, getServiceListWatcher } from "./serviceSaga";

export function* rootSaga() {
    /**
     * Auth Saga
     */
    yield fork(signUpWatcher);
    yield fork(loginWatcher);
    yield fork(logoutWatcher);
    yield fork(onAuthChannelWatcher);
    
    /**
     * Service Saga
     */
    yield fork(createServiceWatcher);
    yield fork(getServiceListWatcher);
    yield fork(getServiceByIdWatcher);
}