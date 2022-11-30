import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: 'blog-films.firebaseapp.com',
    projectId: 'blog-films',
    storageBucket: 'blog-films.appspot.com',
    messagingSenderId: '1001292177325',
    appId: '1:1001292177325:web:d87f44f4d023524eea8b24',
    measurementId: 'G-YDC9MR9LDG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
