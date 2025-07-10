import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY8Ac6y129ny_MEcX4ZpNWmk8bi41EDV4",
  authDomain: "driverratingapp.firebaseapp.com",
  projectId: "driverratingapp",
  storageBucket: "driverratingapp.appspot.com", // 🔹 FIXED storageBucket (Correct format)
  messagingSenderId: "895710770594",
  appId: "1:895710770594:web:c11987332059f476f22efb",
  measurementId: "G-28772HWDW6",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en"; // Set authentication language

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
