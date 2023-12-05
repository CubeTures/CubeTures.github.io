import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { hasCookie, setCookie, updateUserData } from "./firebase-database.js";
import { onLogin } from "./homepage.js";

function onContentLoad() {
    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", login);
    if(hasCookie("uid")) { loginUser(); }
}

function login() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            newLogin(result.user);
        })
        .catch((error) => {
            console.error("Login error:", error);
        });
}

function debugLogin() {
    let fakeUser = new FakeUser("fakeID", "fakeDisplayName");
    newLogin(fakeUser);
}
class FakeUser {
    constructor(uid, displayName) {
        this.uid = uid;
        this.displayName = displayName;
    }
}

function newLogin(user) {
    setCookie("uid", user.uid, 3);
    setDisplayName(user);
    loginUser();
}
function setDisplayName(user) {
    console.log("set un");
    let data = {};
    data["display_name"] = user.displayName;
    updateUserData("readonly", data);
}
function loginUser() {
    console.log(`Login with cookie [${document.cookie}]`);
    onLogin();
}

document.addEventListener("DOMContentLoaded", onContentLoad);