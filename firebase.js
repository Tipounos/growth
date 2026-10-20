// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth";
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

// Register form
const regEmailEl = document.getElementById("register-email")
const regPasswordEl = document.getElementById("register-password")
const regFormEl = document.getElementById("register-form")
let regEmail
let regPassword

regFormEl.addEventListener("submit", function(e) {
  e.preventDefault()
  regPassword = regPasswordEl.value
  regEmail = regEmailEl.value
  createUserWithEmailAndPassword(auth, regEmail, regPassword)
    .then((userCredential) => {
      const user = userCredential.user
    })
    .catch((error) => {
      console.error("Code :", error.code);
      console.error("Message :", error.message);
    });
})
