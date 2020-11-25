import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBET7FZL3jQpU-sDU5SI_fmC7lbYMrK2T4",
    authDomain: "reactjs-ecommerce-service.firebaseapp.com",
    databaseURL: "https://reactjs-ecommerce-service.firebaseio.com",
    projectId: "reactjs-ecommerce-service",
    storageBucket: "reactjs-ecommerce-service.appspot.com",
    messagingSenderId: "268035661383",
    appId: "1:268035661383:web:7af22ec84514a305015b62"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseReduxSaga = new ReduxSagaFirebase(firebaseApp);
