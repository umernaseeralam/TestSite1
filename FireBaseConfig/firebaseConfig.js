// firebaseConfig.js//
//General Config we can use , Instead of creating a path to web//
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {  getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-F_vM6xYRSSBsrg1-7IWOp2ktbHIrtV4",
  authDomain: "talkbox-293f2.firebaseapp.com",
  databaseURL: "https://talkbox-293f2-default-rtdb.firebaseio.com",
  projectId: "talkbox-293f2",
  storageBucket: "talkbox-293f2.appspot.com",
  messagingSenderId: "23719783807",
  appId: "1:23719783807:web:5109bd103f0feae04efe4a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, ref, set, onValue };