import { call, put, takeLatest } from "redux-saga/effects";
import { firebaseReduxSaga, firestore } from "../../config/firebaseConfig";
import { createServiceResponse, initServiceReqState, getServiceListResponse, getServiceByIdResponse, updateServiceResponse, deleteServiceResponse } from "../actions/serviceActions";
import { BaseResponse } from "../entities/BaseResponse";
import { Service } from "../entities/Service";
import { CREATE_SERVICE_REQUEST, DELETE_SERVICE_REQUEST, GET_SERVICE_BY_ID_REQUEST, GET_SERVICE_LIST_REQUEST, UPDATE_SERVICE_REQUEST } from "../types/serviceTypes";

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
      
       service.timestamp = Date.now();
       service.rating = 0;
       const doc = yield call(
            firebaseReduxSaga.firestore.addDocument,
            SERVICES_COLLECTION,
            {...service}
          );
        service.id = doc.id;
        
        response.success = true;
        response.result = service;
        yield put(createServiceResponse(response));
      }
      catch(error) {
        response.errorMessage = error.message;
        yield put(createServiceResponse(response));
      }
}


/**
 * UPDATE SERVICE
 * 
 */
export function* updateServiceWatcher(){
  yield takeLatest(UPDATE_SERVICE_REQUEST, updateService);
}
function* updateService(action: any) {
  const response : BaseResponse<Service> = { success: false, errorMessage: "" };
  const service : Service = action.payload;

  try {
      yield put(initServiceReqState());
      const { id, ...serviceUpdate } = service; // Remove 'id' property from service to be updated
      yield call(firebaseReduxSaga.firestore.updateDocument, `${SERVICES_COLLECTION}/${service.id}`, {...serviceUpdate});
      
      response.success = true;
      response.result = service;
      yield put(updateServiceResponse(response));
    }
    catch(error) {
      response.errorMessage = error.message;
      yield put(updateServiceResponse(response));
    }
}

/**
 * DELETE SERVICE
 * 
 */
export function* deleteServiceWatcher(){
  yield takeLatest(DELETE_SERVICE_REQUEST, deleteService);
}
function* deleteService(action: any) {
  const response : BaseResponse<Service> = { success: false, errorMessage: "" };
  const service : Service = action.payload;

  try {
      yield put(initServiceReqState());
      yield call(firebaseReduxSaga.firestore.deleteDocument, `${SERVICES_COLLECTION}/${service.id}`);
      
      response.success = true;
      response.result = service;
      yield put(deleteServiceResponse(response));
    }
    catch(error) {
      response.errorMessage = error.message;
      yield put(deleteServiceResponse(response));
    }
}


/**
 * GET SERVICE LIST
 * 
 */
export function* getServiceListWatcher(){
  yield takeLatest(GET_SERVICE_LIST_REQUEST, getServiceList);
}
function* getServiceList() {
  const response : BaseResponse<Service[]> = { success: false, result: [], errorMessage: "" };
  try {
      yield put(initServiceReqState());
      const snapshot =yield call(
        firebaseReduxSaga.firestore.getCollection,
        firestore.collection(SERVICES_COLLECTION).orderBy('timestamp')
      )
     
      let serviceList : Service[] = [];

      snapshot.forEach((serviceSnapshot: any) => {
          const service = serviceSnapshot.data();
          service.id = serviceSnapshot.id;

          serviceList = [
            ...serviceList,
            service
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
      yield put(initServiceReqState());
      const snapshot = yield call(firebaseReduxSaga.firestore.getDocument, `${SERVICES_COLLECTION}/${serviceId}`);
      const service = snapshot.data();

      response.result = service;      
      response.success = true;
      yield put(getServiceByIdResponse(response));
    }
    catch(error) {
      response.errorMessage = error.message;
      yield put(getServiceByIdResponse(response));
    }
}