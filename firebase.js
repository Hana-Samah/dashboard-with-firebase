import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyBBNa4CDG7H6LwX_UeMdB9EL5bAB0z4OHE",
    authDomain: "login-form-bbdb1.firebaseapp.com",
    projectId: "login-form-bbdb1",
    storageBucket: "login-form-bbdb1.appspot.com", // أصلحي spelling من `.app` إلى `.appspot.com`
    messagingSenderId: "287126610512",
    appId: "1:287126610512:web:ddcecdf06ed7d11eabe755",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
export { db };
