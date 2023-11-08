import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
const auth = getAuth()

function loginComplete(user) {
    console.log(user.uid);
}

function debugLogin() {

}

function login() {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            loginComplete(result.user);
        })
        .catch((error) => {
            console.error("Login error:", error);
        });
}

function onContentLoad() {
    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", login);
}


document.addEventListener("DOMContentLoaded", onContentLoad);