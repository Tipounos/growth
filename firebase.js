// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn4Wnd25zkzoznc_tps3k8UbqdMMI_LkQ",
  authDomain: "growth-73c7f.firebaseapp.com",
  projectId: "growth-73c7f",
  storageBucket: "growth-73c7f.firebasestorage.app",
  messagingSenderId: "574909294127",
  appId: "1:574909294127:web:3f9f53658b04cb3f1288da",
  measurementId: "G-7L00T10BM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);