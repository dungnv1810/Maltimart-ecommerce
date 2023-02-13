// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfhYBtrqDKAyGVwcatf8JVLyD7VmQ4o34",
  authDomain: "malimart-5cd39.firebaseapp.com",
  projectId: "malimart-5cd39",
  storageBucket: "malimart-5cd39.appspot.com",
  messagingSenderId: "409533988536",
  appId: "1:409533988536:web:9e2c565abe186565a17e4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app) 
export default app