// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCNRAsCSlb6ioHMgOCmiKjhbPhNOAhUxo",
  authDomain: "movies-app-rather-labs.firebaseapp.com",
  projectId: "movies-app-rather-labs",
  storageBucket: "movies-app-rather-labs.appspot.com",
  messagingSenderId: "923567925546",
  appId: "1:923567925546:web:11ca0c70e60095886a1653"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;