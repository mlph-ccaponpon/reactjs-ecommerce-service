import { fork } from "redux-saga/effects";
import { loginWatcher, logoutWatcher, onAuthChannelWatcher, signUpWatcher } from "./authSaga";
import { addServiceReviewWatcher, createServiceWatcher, deleteServiceWatcher, getServiceByIdWatcher, getServiceListWatcher, updateServiceWatcher } from "./serviceSaga";

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
    yield fork(updateServiceWatcher);
    yield fork(deleteServiceWatcher);
    yield fork(getServiceListWatcher);
    yield fork(getServiceByIdWatcher);
    yield fork(addServiceReviewWatcher);
}