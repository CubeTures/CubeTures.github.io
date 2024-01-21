import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// const envPath = "/.env";

// async function getEnv() {
//   const env = await fetch(envPath);
//   console.log(env);
// }
// getEnv();

//#region api key
const encryptedCode = "AAAAAAAAAFELJStmLAZPCS43a3MmHydCCAJ0GAFEFSApAycWIQNb";
const encryptedKey = 'QUl6YVN5QmVndFNWSm42bFd5XzBxdWsyb0VMeXkwd29TUm1DcU44';

function decrypt(code, key) {
  key = decodeURIComponent(escape(atob(key)));
  code = decodeURIComponent(escape(atob(code)));
  
  let result = '';
  for (let i = 0; i < code.length; i++) {
    result += String.fromCharCode(code.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

const API_KEY = decrypt(encryptedCode, encryptedKey);
//#endregion

const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: "mealmatch-40661.firebaseapp.com",
  databaseURL: "https://mealmatch-40661-default-rtdb.firebaseio.com",
  projectId: "mealmatch-40661",
  storageBucket: "mealmatch-40661.appspot.com",
  messagingSenderId: "691358567925",
  appId: "1:691358567925:web:3411cdb0ef590dc93324bc"
};

const app = initializeApp(firebaseConfig);

export { API_KEY };