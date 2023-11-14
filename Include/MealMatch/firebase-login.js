import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { onLogin } from "./homepage.js";

function loginUser() {
    console.log(`Login with cookie [${document.cookie}]`);
    onLogin();
}
function setCookie(user) {
    document.cookie = `uid=${user.uid} displayName=${user.displayName}`;
}

class FakeUser {
    constructor(uid, displayName) {
        this.uid = uid;
        this.displayName = displayName;
    }
}
function debugLogin() {
    console.log("Logging in...");
    let fakeUser = new FakeUser("fakeID", "fakeDisplayName");
    setCookie(fakeUser);
    loginUser();
}

function login() {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            setCookie(result.user);
            loginUser();
        })
        .catch((error) => {
            console.error("Login error:", error);
        });
}

function onContentLoad() {
    // check cookies for user id
    // if user is found push directly to onlogin

    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", debugLogin);
}

document.addEventListener("DOMContentLoaded", onContentLoad);