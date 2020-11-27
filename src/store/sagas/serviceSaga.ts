import { call, put, takeLatest } from "redux-saga/effects";
import { firebaseApp, firebaseReduxSaga } from "../../config/firebaseConfig";
import { createServiceResponse, initServiceReqState, searchServiceResponse } from "../actions/serviceActions";
import { BaseResponse } from "../entities/BaseResponse";
import { Service } from "../entities/Service";
import { CREATE_SERVICE_REQUEST, SEARCH_SERVICE_REQUEST } from "../types/serviceTypes";
import { v4 as uuidV4 } from 'uuid';

const SERVICES_COLLECTION = "services";

/**
 * CREATE SERVICE
 * 
 */
export function* createServiceWatcher(){
    yield takeLatest(CREATE_SERVICE_REQUEST, createService);
}
function* createService(action: any) {
    const response : BaseResponse<Service> = { success: false, errorMessage: "" };
    const service : Service = action.payload;

    try {
        yield put(initServiceReqState());
      
       service.id = uuidV4();
       service.timestamp = Date.now();
       yield call(
            firebaseReduxSaga.firestore.addDocument,
            SERVICES_COLLECTION,
            {...service}
          );
        
        response.success = true;
        response.result = service;
        console.log(service);
        yield put(createServiceResponse(response));
      }
      catch(error) {
        response.errorMessage = error.message;
        yield put(createServiceResponse(response));
      }
}

/**
 * SEARCH SERVICE
 * based on given service properties
 */
export function* searchServiceWatcher(){
  yield takeLatest(SEARCH_SERVICE_REQUEST, searchService);
}
function* searchService(action: any) {
  const response : BaseResponse<Service[]> = { success: false, result: [], errorMessage: "" };
  try {
      yield put(initServiceReqState());
      const snapshot =yield call(
        firebaseReduxSaga.firestore.getCollection,
        firebaseApp.firestore().collection(SERVICES_COLLECTION).orderBy('timestamp', 'desc')
      )

      // const snapshot = yield call(firebaseReduxSaga.firestore.getCollection, SERVICES_COLLECTION);
      let serviceList : Service[] = [];

      snapshot.forEach((serviceSnapshot: any) => {
          serviceList = [
            ...serviceList,
            serviceSnapshot.data()
          ]
      });

      response.result = serviceList;      
      response.success = true;
      yield put(searchServiceResponse(response));
    }
    catch(error) {
      response.errorMessage = error.message;
      yield put(searchServiceResponse(response));
    }
}