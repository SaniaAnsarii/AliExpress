// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfT1mJdvpuWMFmnkOlGwIMxjOYeDrbUUU",
  authDomain: "aliexpress-b45ba.firebaseapp.com",
  projectId: "aliexpress-b45ba",
  storageBucket: "aliexpress-b45ba.firebasestorage.app",
  messagingSenderId: "836799293903",
  appId: "1:836799293903:web:b84ee12f81ef4cc9eb0aba",
  measurementId: "G-GGE622HB5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
