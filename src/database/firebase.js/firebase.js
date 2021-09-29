// Import the functions you need from the SDKs you need
import firebase from "firebase"
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkZ1gDrbDdLijFL5gvvQ_HW5T4RJyefa0",
  authDomain: "todo-list-jsi.firebaseapp.com",
  projectId: "todo-list-jsi",
  storageBucket: "todo-list-jsi.appspot.com",
  messagingSenderId: "235062466989",
  appId: "1:235062466989:web:bfad8a343c4a80c48f6924"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default {
    firebase,
    db
}