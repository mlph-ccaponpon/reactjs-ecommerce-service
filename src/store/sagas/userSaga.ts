import { call, put, takeLatest } from "redux-saga/effects";
import { firebaseReduxSaga, firestore, USERS_COLLECTION } from "../../config/firebaseConfig";
import { deleteUserResponse, initUserReqState, updateUserResponse } from "../actions/userActions";
import { BaseResponse } from "../entities/BaseResponse";
import { User } from "../entities/User";
import { DELETE_USER_REQUEST, GET_USER_LIST_REQUEST, UPDATE_USER_REQUEST } from "../types/userTypes";
import { getUserListResponse } from "../actions/userActions";

/**
 * UPDATE USER
 * 
 */
export function* updateUserWatcher(){
    yield takeLatest(UPDATE_USER_REQUEST, updateUser);
  }
  function* updateUser(action: any) {
    const response : BaseResponse<User> = { success: false, errorMessage: "" };
    const userUpdate : User = action.payload;
  
    try {
        yield put(initUserReqState());
        yield call(firebaseReduxSaga.firestore.updateDocument, `${USERS_COLLECTION}/${userUpdate.uid}`, {...userUpdate});
        
        response.success = true;
        response.result = userUpdate;
        yield put(updateUserResponse(response));
      }
      catch(error) {
        response.errorMessage = error.message;
        yield put(updateUserResponse(response));
      }
  }

/**
 * DISABLE USER
 * 
 */
export function* deleteUserWatcher(){
    yield takeLatest(DELETE_USER_REQUEST, deleteUser);
  }
  function* deleteUser(action: any) {
    const response : BaseResponse<User> = { success: false, errorMessage: "" };
    const user : User = action.payload;
  
    try {
        yield put(initUserReqState());

        //DISABLE USER
        yield call(firebaseReduxSaga.firestore.updateDocument, `${USERS_COLLECTION}/${user.uid}`, {disabled: true});

        response.success = true;
        response.result = user;
        yield put(deleteUserResponse(response));
      }
      catch(error) {
        response.errorMessage = error.message;
        yield put(deleteUserResponse(response));
      }
  }

/**
 * GET USER LIST
 * 
 */
export function* getUserListWatcher(){
    yield takeLatest(GET_USER_LIST_REQUEST, getUserList);
}
function* getUserList() {
    const response : BaseResponse<User[]> = { success: false, result: [], errorMessage: "" };
    try {
        yield put(initUserReqState());
        const snapshot =yield call(
            firebaseReduxSaga.firestore.getCollection,
            firestore.collection(USERS_COLLECTION)
              .where('disabled', '==', false).orderBy('timestamp', 'desc')
        )
        
        let userList : User[] = [];

        snapshot.forEach((userSnapshot: any) => {
            const user = userSnapshot.data();
            user.id = userSnapshot.id;

            userList = [
                ...userList,
                user
            ]
        });

        response.result = userList;      
        response.success = true;
        yield put(getUserListResponse(response));
    }
    catch(error) {
        response.errorMessage = error.message;
        yield put(getUserListResponse(response));
    }
}
  