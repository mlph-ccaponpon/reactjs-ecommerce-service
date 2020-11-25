import { LOGIN_REQUEST, SIGN_UP_REQUEST } from "../types/authTypes";
import {takeLatest, call, put} from "redux-saga/effects";
import { BaseResponse } from "../entities/BaseResponse";
import { firebaseReduxSaga } from '../../config/firebaseConfig';
import { loginResponse, setErrorMessage, setIsLoading, signUpResponse } from "../actions/authActions";
import { Role, User } from "../entities/User";
import { UserCredential } from "../entities/UserCredential";

/**
 * SIGN UP 
 * - Sign up user and add a document for user details
 */
export function* signUpWatcher(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* signUp(action: any) {
    const response : BaseResponse = { success: false, errorMessage: "" };
    try {
        yield put(setErrorMessage(""));
        yield put(setIsLoading(true));
        const user : User = action.payload;
        
        // Sign up 
        const signUpResult = yield call(firebaseReduxSaga.auth.createUserWithEmailAndPassword, user.email, user.password);
        const uid = signUpResult.user.uid;
        const email = signUpResult.user.email;
    
        // Add User Document
        yield call(firebaseReduxSaga.firestore.addDocument,
            "users",
            {
                name: user.name,
                uid: uid,
                email: email,
                role: user.role ? user.role: Role.CUSTOMER 
            })

        response.success = true;
        yield put(signUpResponse(response));
    }
    catch(error) {
        response.errorMessage = error.message;
        yield put(signUpResponse(response));
    }
}

/**
 * LOGIN USER
 * (email and password)
 */
export function* loginWatcher(){
    yield takeLatest(LOGIN_REQUEST, login);
}
function* login(action: any) {
    const response : BaseResponse = { success: false, errorMessage: "" };
    const userCredential : UserCredential = action.payload;
    try {
        yield put(setErrorMessage(""));
        yield put(setIsLoading(true));
        yield call(firebaseReduxSaga.auth.signInWithEmailAndPassword, userCredential.email, userCredential.password);
        
        response.success = true;
        yield put(loginResponse(response));
      }
      catch(error) {
        response.errorMessage = error.message;
        yield put(loginResponse(response));
      }
}
