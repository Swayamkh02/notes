// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , serverTimestamp} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB--GyxIaUm-S_LHO1Q0MpJQb_eGHKz-Jw",
  authDomain: "notes-4a8f3.firebaseapp.com",
  projectId: "notes-4a8f3",
  storageBucket: "notes-4a8f3.firebasestorage.app",
  messagingSenderId: "121656582102",
  appId: "1:121656582102:web:a26205008ab71c08574e77",
  measurementId: "G-73Z9N438N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, serverTimestamp };
