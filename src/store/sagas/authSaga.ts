import { LOGIN_REQUEST, SIGN_UP_REQUEST, LOGOUT_REQUEST, AUTH_CHANNEL_REQUEST } from "../types/authTypes";
import {takeLatest, call, put, take} from "redux-saga/effects";
import { BaseResponse } from "../entities/BaseResponse";
import { firebaseReduxSaga } from '../../config/firebaseConfig';
import { initAuthReqState, loginResponse, logoutResponse, setIsLoadingPage} from "../actions/authActions";
import { Role, User } from "../entities/User";
import { UserCredential } from "../entities/UserCredential";

const USERS_COLLECTION = "users";

/**
 * AUTH CHANNEL
 * - This function is called on SIGN_UP_REQUEST, LOGIN_REQUEST and LOGOUT_REQUEST success response
 * - Checks if the user is currently loogedin or not
 */
export function* onAuthChannelWatcher() {
    yield takeLatest(AUTH_CHANNEL_REQUEST, onAuthChannel);
}
function* onAuthChannel() {
    try {
        const successResponse : BaseResponse<User | null> = { success: true, errorMessage: "" };
        
        yield put(setIsLoadingPage(true));
        const authChannel = yield call(firebaseReduxSaga.auth.channel);
    
        while (true) {
            const { user } = yield take(authChannel);

            if (user) {
                const uid = user.uid;
                
                // Get User Document
                const snapshot = yield call(firebaseReduxSaga.firestore.getDocument, `${USERS_COLLECTION}/${uid}`);
                const currUser: User = snapshot.data();
                successResponse.result = currUser;
                yield put(loginResponse(successResponse));
            }
            else {
                successResponse.result = null;
                yield put(logoutResponse(successResponse));
            }

            yield put(setIsLoadingPage(false));
        }
      }
      catch (error) {
      }
}

/**
 * SIGN UP 
 * - Sign up user, set a document for user details, and automatically login user
 */
export function* signUpWatcher(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* signUp(action: any) {
    try {
        yield put(initAuthReqState());
        const user : User = action.payload;
        
        // Sign up 
        if(user.email && user.password) {
            const signUpResult = yield call(firebaseReduxSaga.auth.createUserWithEmailAndPassword, user.email, user.password);
            const uid = signUpResult.user.uid;
            const email = signUpResult.user.email;
        
            // Set User Document
            yield call(firebaseReduxSaga.firestore.setDocument,
                `${USERS_COLLECTION}/${uid}`,
                {
                    timestamp: Date.now(),
                    name: user.name,
                    uid: uid,
                    email: email,
                    role: user.role ? user.role: Role.CUSTOMER.value 
                },{})
        }
    }
    catch(error) {
        const errorResponse : BaseResponse<User | null> = { success: false, result: null, errorMessage: error.message };
        yield put(loginResponse(errorResponse));
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
    try {
        const userCredential : UserCredential = action.payload;
        yield put(initAuthReqState());
        yield call(firebaseReduxSaga.auth.signInWithEmailAndPassword, userCredential.email, userCredential.password);
      }
      catch(error) {
        const errorResponse : BaseResponse<User | null> = { success: false, result: null, errorMessage: error.message };
        yield put(loginResponse(errorResponse));
      }
}

/**
 * LOGOUT USER
 */
export function* logoutWatcher(){
    yield takeLatest(LOGOUT_REQUEST, logout);
}
function* logout() {
    try {
        yield call(firebaseReduxSaga.auth.signOut);
    }
    catch(error) {
        const errorResponse : BaseResponse<User | null> = { success: false, result: null, errorMessage: error.message };
        yield put(logoutResponse(errorResponse));
    }
}


