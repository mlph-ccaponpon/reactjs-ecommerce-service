import { call, put, takeLatest } from "redux-saga/effects";
import { firebaseReduxSaga, firestore } from "../../config/firebaseConfig";
import { createServiceResponse, initServiceReqState, getServiceListResponse, getServiceByIdResponse, updateServiceResponse, deleteServiceResponse, addServiceReviewResponse } from "../actions/serviceActions";
import { BaseResponse } from "../entities/BaseResponse";
import { Service } from "../entities/Service";
import { ServiceReview } from "../entities/ServiceReview";
import { Role, User } from "../entities/User";
import { ADD_SERVICE_REVIEW_REQUEST, CREATE_SERVICE_REQUEST, DELETE_SERVICE_REQUEST, GET_SERVICE_BY_ID_REQUEST, GET_SERVICE_LIST_REQUEST, UPDATE_SERVICE_REQUEST } from "../types/serviceTypes";

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
       service.reviews = [];
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
  const serviceUpdate : Service = action.payload;

  try {
      yield put(initServiceReqState());
      yield call(firebaseReduxSaga.firestore.updateDocument, `${SERVICES_COLLECTION}/${serviceUpdate.id}`, {...serviceUpdate});
      
      response.success = true;
      response.result = serviceUpdate;
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
function* getServiceList(action: any) {
  const response : BaseResponse<Service[]> = { success: false, result: [], errorMessage: "" };
  const currUser: User = action.payload;
  const isAdmin = (currUser.role === Role.ADMIN.value);

  try {
      yield put(initServiceReqState());
      let snapshot;
      if(isAdmin) {
        snapshot = yield call(
          firebaseReduxSaga.firestore.getCollection,
          firestore.collection(SERVICES_COLLECTION).orderBy('timestamp', 'desc')
        )
      } else {
        snapshot = yield call(
          firebaseReduxSaga.firestore.getCollection,
          firestore.collection(SERVICES_COLLECTION)
            .where('providerUid', '==', currUser.uid)
        )
      }
     
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
      service.id = snapshot.id;

      response.result = service;      
      response.success = true;
      yield put(getServiceByIdResponse(response));
    }
    catch(error) {
      response.errorMessage = error.message;
      yield put(getServiceByIdResponse(response));
    }
}

/**
 * ADD SERVICE REVIEW
 * 
 */
export function* addServiceReviewWatcher(){
  yield takeLatest(ADD_SERVICE_REVIEW_REQUEST, addServiceReview);
}
function* addServiceReview(action: any) {
  const response : BaseResponse<Service> = { success: false, errorMessage: "" };
  const service : Service = action.payload.service;
  const serviceReview : ServiceReview = action.payload.review;

  console.log(serviceReview);
  // Set Reviews
  let serviceReviewList : ServiceReview[] = [];
  if(service.reviews) {
    serviceReview.timestamp = Date.now();
    serviceReviewList = [serviceReview,...service.reviews];
  }
  service.reviews = serviceReviewList;

  // Compute ratings average
  let ratingsTotal = serviceReviewList.reduce((total, currentValue) => total += currentValue.rating,0);
  let ratingAvg = (ratingsTotal/serviceReviewList.length);
  service.rating = ratingAvg;
  
  try {
      yield put(initServiceReqState());
      yield call(firebaseReduxSaga.firestore.updateDocument, `${SERVICES_COLLECTION}/${service.id}`, {rating: ratingAvg, reviews: service.reviews});
      
      response.success = true;
      response.result = service;
      yield put(addServiceReviewResponse(response));
    }
    catch(error) {
      response.errorMessage = error.message;
      yield put(addServiceReviewResponse(response));
    }
}