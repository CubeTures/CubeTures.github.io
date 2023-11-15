import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getCookie, setCookie } from "./firebase-database.js";
import { onLogin } from "./homepage.js";

function loginUser() {
    console.log(`Login with cookie [${document.cookie}]`);
    onLogin();
}
function newLogin(user) {
    setCookie("uid", user.uid, 3);
    setCookie("displayName", user.displayName, 3);
    loginUser();
}

class FakeUser {
    constructor(uid, displayName) {
        this.uid = uid;
        this.displayName = displayName;
    }
}
function debugLogin() {
    let fakeUser = new FakeUser("fakeID", "fakeDisplayName");
    newLogin(fakeUser);
}

function login() {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            newLogin(result.user);
        })
        .catch((error) => {
            console.error("Login error:", error);
        });
}

function onContentLoad() {
    let uid = getCookie("uid");
    if(uid) { loginUser(); }

    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", debugLogin);
}

document.addEventListener("DOMContentLoaded", onContentLoad);