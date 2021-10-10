import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB12sMrvrt3zfmbmeoLrnhxkYt6vtriCE8",
    authDomain: "ararkodai.firebaseapp.com",
    projectId: "ararkodai",
    storageBucket: "ararkodai.appspot.com",
    messagingSenderId: "235827349277",
    appId: "1:235827349277:web:91f35ebb4a2f667ce543f4",
    measurementId: "G-SHZZM5KTB6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;