import { fork } from "redux-saga/effects";
import { signUpWatcher } from "./authSaga";

export function* rootSaga() {
    /**
     * Auth Saga
     */
    yield fork(signUpWatcher);
    
}