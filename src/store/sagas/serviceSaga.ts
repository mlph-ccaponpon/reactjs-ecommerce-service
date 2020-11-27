import { call, takeLatest } from "redux-saga/effects";
import { firebaseReduxSaga } from "../../config/firebaseConfig";
import { BaseResponse } from "../entities/BaseResponse";
import { CREATE_SERVICE_REQUEST } from "../types/serviceTypes";

const SERVICES_COLLECTION = "services";
/**
 * CREATE SERVICE
 * 
 */
export function* createServiceWatcher(){
    yield takeLatest(CREATE_SERVICE_REQUEST, createService);
}
function* createService(action: any) {
    const response : BaseResponse = { success: false, errorMessage: "" };
    try {
        const service = action.payload;
        const createdService = yield call(
            firebaseReduxSaga.firestore.addDocument,
            SERVICES_COLLECTION,
            {...service}
          );
        console.log("Created Service");
        console.log(createdService);
      }
      catch(error) {
          console.log(error.message);
      }
}