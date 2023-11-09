import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { setupDatabase } from "./FirebaseDatabase.js";

class FakeUser {
    constructor(uid, displayName) {
        this.uid = uid;
        this.displayName = displayName;
    }
}
function debugLogin() {
    let fakeUser = new FakeUser("fakeID", "fakeDisplayName");
    setupDatabase(fakeUser);
}

function login() {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            setupDatabase(result.user);
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
