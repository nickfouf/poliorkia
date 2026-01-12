import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPvMietdRlqWwCu94qOoPWY-E20G9ljnk",
  authDomain: "v1game-234c2.firebaseapp.com",
  databaseURL: "https://v1game-234c2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "v1game-234c2",
  storageBucket: "v1game-234c2.firebasestorage.app",
  messagingSenderId: "434032925258",
  appId: "1:434032925258:web:6f7c8a6da0a42c88d8a4b3",
  measurementId: "G-FWQ7NDF130"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Uncomment if you use a local emulator during dev
// connectDatabaseEmulator(db, 'localhost', 9000);

