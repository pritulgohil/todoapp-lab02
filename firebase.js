import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2qJ1GXLeDgAnSFNnvvWFN1aJQ9Wk9FLg",
  authDomain: "todoapp-pritul.firebaseapp.com",
  databaseURL: "https://todoapp-pritul-default-rtdb.firebaseio.com",
  projectId: "todoapp-pritul",
  storageBucket: "todoapp-pritul.appspot.com",
  messagingSenderId: "556407844249",
  appId: "1:556407844249:web:4726f5dd04ae3fd1e63708",
  measurementId: "G-TT4FDZ2Q0T",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
