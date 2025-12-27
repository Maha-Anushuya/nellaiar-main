import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2jYCb7vZdLIh0jOZfLE44ZtwE0dc9nms",
  authDomain: "nellaiar.firebaseapp.com",
  projectId: "nellaiar",
  storageBucket: "nellaiar.firebasestorage.app",
  messagingSenderId: "1076331330420",
  appId: "1:1076331330420:web:c12cb208c30ae10bf7ca21",
  measurementId: "G-WVC7VKL2YZ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result;
}

export async function logout() {
  return await signOut(auth);
}
