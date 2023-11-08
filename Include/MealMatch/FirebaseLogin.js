import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
const auth = getAuth()

function login() {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            // User signed in successfully
            const user = result.user;
            console.log(`Logged in as ${user.displayName}`);
        })
        .catch((error) => {
            // Handle login errors
            console.error("Login error:", error);
        });
}

function onContentLoad() {
    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", login);
}


document.addEventListener("DOMContentLoaded", onContentLoad);