import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
  apiKey: "API_KEY_HERE",
  authDomain: "AUTH_DOMAIN_HERE",
  projectId: "PROJECT_ID_HERE",
  storageBucket: "STORAGE_BUCKET_HERE",
  messagingSenderId: "SENDER_ID_HERE",
  appId: "APP_ID_HERE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
export { db };
