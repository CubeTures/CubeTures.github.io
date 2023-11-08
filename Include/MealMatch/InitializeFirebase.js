// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBegtSVJn6lWy_0quk2oELyy0woSRmCqN8",
  authDomain: "mealmatch-40661.firebaseapp.com",
  databaseURL: "https://mealmatch-40661-default-rtdb.firebaseio.com",
  projectId: "mealmatch-40661",
  storageBucket: "mealmatch-40661.appspot.com",
  messagingSenderId: "691358567925",
  appId: "1:691358567925:web:3411cdb0ef590dc93324bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app }