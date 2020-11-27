import { call, put, takeLatest } from "redux-saga/effects";
import { firebaseReduxSaga, firestore } from "../../config/firebaseConfig";
import { createServiceResponse, initServiceReqState, getServiceListResponse, getServiceByIdResponse } from "../actions/serviceActions";
import { BaseResponse } from "../entities/BaseResponse";
import { Service } from "../entities/Service";
import { CREATE_SERVICE_REQUEST, GET_SERVICE_BY_ID_REQUEST, GET_SERVICE_LIST_REQUEST } from "../types/serviceTypes";
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
 * GET SERVICE LIST
 * 
 */
export function* getServiceListWatcher(){
  yield takeLatest(GET_SERVICE_LIST_REQUEST, getServiceList);
}
function* getServiceList(action: any) {
  const response : BaseResponse<Service[]> = { success: false, result: [], errorMessage: "" };
  try {
      yield put(initServiceReqState());
      const snapshot =yield call(
        firebaseReduxSaga.firestore.getCollection,
        firestore.collection(SERVICES_COLLECTION).orderBy('timestamp')
      )
     
      let serviceList : Service[] = [];

      snapshot.forEach((serviceSnapshot: any) => {
          serviceList = [
            ...serviceList,
            serviceSnapshot.data()
          ]
      });

      response.result = serviceList;      
      response.success = true;
      yield put(getServiceListResponse(response));
    }
    catch(error) {
      response.errorMessage = error.message;
      yield put(getServiceListResponse(response));
    }
}


/**
 * GET SERVICE BY ID
 *
 */
export function* getServiceByIdWatcher(){
  yield takeLatest(GET_SERVICE_BY_ID_REQUEST, getServiceById);
}
function* getServiceById(action: any) {
  const response : BaseResponse<Service> = { success: false, errorMessage: "" };
  const serviceId = action.payload;
  try {
      console.log(`SERVICE ID:${serviceId}`);
      yield put(initServiceReqState());
      const snapshot =yield call(
        firebaseReduxSaga.firestore.getCollection,
        firestore.collection(SERVICES_COLLECTION)
          .where('id','==',serviceId)
      )

      console.log("SERVICE");
      console.log("SNAPSHOT");
      console.log(snapshot);
      let serviceList : Service[] = [];
      snapshot.forEach((serviceSnapshot: any) => {
        serviceList = [
          ...serviceList,
          serviceSnapshot.data()
        ]
    });
      response.result = serviceList[0];      
      response.success = true;
      yield put(getServiceByIdResponse(response));
    }
    catch(error) {
      response.errorMessage = error.message;
      yield put(getServiceByIdResponse(response));
    }
}