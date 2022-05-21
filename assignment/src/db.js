// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2xNqfFaRgpiXjZ6bUYXxWoddO9QYsA3s",
  authDomain: "fir-372ac.firebaseapp.com",
  databaseURL: "https://fir-372ac-default-rtdb.firebaseio.com",
  projectId: "fir-372ac",
  storageBucket: "fir-372ac.appspot.com",
  messagingSenderId: "788971671331",
  appId: "1:788971671331:web:d0506776217e6d03ff8696",
  measurementId: "G-N8S8ZDHDBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const dbRef = ref(getDatabase());
export default database;