// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "fullstack-blog-5c73d.firebaseapp.com",
  projectId: "fullstack-blog-5c73d",
  storageBucket: "fullstack-blog-5c73d.firebasestorage.app",
  messagingSenderId: "346289990017",
  appId: "1:346289990017:web:baceccded5b447a79a2080",
  measurementId: "G-8NZ4MX0EX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
