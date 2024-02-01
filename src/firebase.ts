import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Initalize Firebase
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
}
const app = initializeApp(firebaseConfig)
const database = getFirestore(app)

export { database, app }