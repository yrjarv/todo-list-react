import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Initalize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCcnNV7yW8gKuZ7b555AWIT43WrTP--UoM",
  authDomain: "todo-yrjarv.firebaseapp.com",
  projectId: "todo-yrjarv",
  storageBucket: "todo-yrjarv.appspot.com",
  messagingSenderId: "917782598927",
  appId: "1:917782598927:web:a87a59b397b7f45b9f5a7a"
}
const app = initializeApp(firebaseConfig)
const database = getFirestore(app)

export { database, app }