// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVyBZldkMgjPT9mOnjfXFgKgknaKAoA20",
  authDomain: "taskease-415415.firebaseapp.com",
  projectId: "taskease-415415",
  storageBucket: "taskease-415415.appspot.com",
  messagingSenderId: "431894228668",
  appId: "1:431894228668:web:966aba3b5ae589aacb2ab9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, "gs://taskease-415415.appspot.com");
