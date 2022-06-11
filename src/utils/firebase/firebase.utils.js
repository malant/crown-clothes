import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';


import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiB1ukNDGQSAuKBG4RMBtPfjfqSPlKfyU",
  authDomain: "crwn-db-ed0d9.firebaseapp.com",
  databaseURL: "https://crwn-db-ed0d9.firebaseio.com",
  projectId: "crwn-db-ed0d9",
  storageBucket: "crwn-db-ed0d9.appspot.com",
  messagingSenderId: "995172397453",
  appId: "1:995172397453:web:47044f8ff6e15bc9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

if(!userSnapshot.exists()) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInformation
    });
  } catch(error) {
    console.log('Error creating the user', error.message);
  }
}

return userDocRef;
 
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}
