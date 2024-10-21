import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3yL5nxZAsCd_fODPzdl2CLJZaar_n348",
  authDomain: "ring-0.firebaseapp.com",
  projectId: "ring-0",
  storageBucket: "ring-0.appspot.com",
  messagingSenderId: "854130462511",
  appId: "1:854130462511:web:024f3ab159bf804fca1bda",
  measurementId: "G-JM77D2MW8J"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// const analytics = getAnalytics(app);