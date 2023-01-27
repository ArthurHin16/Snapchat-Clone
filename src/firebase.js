import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7xJM4h8lZoARVnTQUIsq_OYSMUVYyURU",
    authDomain: "snapchat-clone-ef607.firebaseapp.com",
    projectId: "snapchat-clone-ef607",
    storageBucket: "snapchat-clone-ef607.appspot.com",
    messagingSenderId: "534374108257",
    appId: "1:534374108257:web:6c6dd9561ec4603ea72e20"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider();
export { firebaseApp, db, auth, storage, provider };