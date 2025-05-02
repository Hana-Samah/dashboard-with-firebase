// استيراد Firebase من CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBNa4CDG7H6LwX_UeMdB9EL5bAB0z4OHE",
  authDomain: "login-form-bbdb1.firebaseapp.com",
  projectId: "login-form-bbdb1",
  storageBucket: "login-form-bbdb1.appspot.com", // أصلحي spelling من `.app` إلى `.appspot.com`
  messagingSenderId: "287126610512",
  appId: "1:287126610512:web:ddcecdf06ed7d11eabe755",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// عرض رسالة
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// تسجيل حساب جديد
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const firstName = document.getElementById("fName").value;
  const lastName = document.getElementById("lName").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
      };

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          showMessage("Account Created Successfully", "signUpMessage");
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showMessage("Email Address Already Exists !!!", "signUpMessage");
      } else {
        showMessage("Unable to create user", "signUpMessage");
      }
    });
});

// تسجيل الدخول
const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      showMessage("Login is successful", "signInMessage");
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential" || errorCode === "auth/wrong-password") {
        showMessage("Incorrect Email or Password", "signInMessage");
      } else {
        showMessage("Account does not exist", "signInMessage");
      }
    });
});
