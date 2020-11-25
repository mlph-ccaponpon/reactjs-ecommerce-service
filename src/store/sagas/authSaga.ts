import { SIGN_UP_REQUEST } from "../types/authTypes";
import {takeLatest, call, put} from "redux-saga/effects";
import { BaseResponse } from "../entities/BaseResponse";
import firebaseApp from '../../config/firebaseApp';
import { setErrorMessage, setIsLoading, signUpResponse } from "../actions/authActions";
import { Role, User } from "../entities/User";

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
        const signUpResult = yield call(firebaseApp.auth.createUserWithEmailAndPassword, user.email, user.password);
        const uid = signUpResult.user.uid;
        const email = signUpResult.user.email;
        
        // Add User Document
        yield call(firebaseApp.firestore.addDocument,
            "users",
            {
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