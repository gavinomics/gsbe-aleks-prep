import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdMuaOh98n79zp_7iSCT1guLKZLVQUKk4",
  authDomain: "cecmathprep.firebaseapp.com",
  projectId: "cecmathprep",
  storageBucket: "cecmathprep.firebasestorage.app",
  messagingSenderId: "159084078564",
  appId: "1:159084078564:web:7b90443099d6fb4e17d3f1",
  measurementId: "G-BK33F2DKVK"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

window.firebaseApp = app;
window.firebaseAuth = getAuth(app);
window.firebaseDB = getFirestore(app);
