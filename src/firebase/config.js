import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseApiKey } from './config-secret';

const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: "n22-thedojo.firebaseapp.com",
    projectId: "n22-thedojo",
    storageBucket: "n22-thedojo.appspot.com",
    messagingSenderId: "40756640888",
    appId: "1:40756640888:web:7d26400d1fd7511828418d"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };