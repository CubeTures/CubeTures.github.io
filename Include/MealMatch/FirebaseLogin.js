import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
let userData;
let unsubscribeOnValue;

function getReference(uid) {
    const db = getDatabase();
    const path = `users/${uid}`;
    return ref(db, path);
}
function setUserData(snapshot, callback) {
    userData = snapshot.val();
    unsubscribeOnValue();
    callback();
}
function updateUserData(reference, callback) {
    unsubscribeOnValue = onValue(reference, 
        (snapshot) => setUserData(snapshot, callback));
}

function updateDisplay() {
    const elem = document.getElementById("data");
    elem.innerHTML = JSON.stringify(userData);
}

function getNewUserData(displayName) {
    return {
        "username": displayName,
        "friends": [],
        "session": {},
        "requests": []
    }
}
function setNewUserData(reference, displayName) {
    let newUserData = getNewUserData(displayName);
    set(reference, newUserData);
    userData = newUserData;
}
function setupDatabase(user) {
    const reference = getReference(user.uid);
    updateUserData(reference, () => {
        if(userData == null) {
            setNewUserData(reference, user.displayName);
        }
        updateDisplay();
    });
}

class FakeUser {
    constructor(uid, displayName) {
        this.uid = uid;
        this.displayName = displayName;
    }
}
function debugLogin() {
    //"Y8Zw66hR3lhZIp0p213npkBAVq52"
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
