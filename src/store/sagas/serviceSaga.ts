import { call, put, takeLatest } from "redux-saga/effects";
import { firebaseReduxSaga } from "../../config/firebaseConfig";
import { createServiceResponse, setIsServiceLoading, setServiceErrorMessage } from "../actions/serviceActions";
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
        yield put(setServiceErrorMessage(""));
        yield put(setIsServiceLoading(true));

        const service = action.payload;
        yield call(
            firebaseReduxSaga.firestore.addDocument,
            SERVICES_COLLECTION,
            {...service}
          );
        
        response.success = true;
        yield put(createServiceResponse(response));
      }
      catch(error) {
        response.errorMessage = error.message;
        yield put(createServiceResponse(response));
      }
}