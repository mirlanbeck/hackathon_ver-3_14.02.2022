
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi3QRALHn5Wd308vFJ6oPL4AQVhhDFgRs",
  authDomain: "hackaton-60955.firebaseapp.com",
  projectId: "hackaton-60955",
  storageBucket: "hackaton-60955.appspot.com",
  messagingSenderId: "678528895546",
  appId: "1:678528895546:web:7d26986287c4a988b20303"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
