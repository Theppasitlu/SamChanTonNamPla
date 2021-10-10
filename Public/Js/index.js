import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js';
// import { getFirestore, collection, getDocs, getDoc } from 'firebase/firestore';

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyB12sMrvrt3zfmbmeoLrnhxkYt6vtriCE8",
    authDomain: "ararkodai.firebaseapp.com",
    projectId: "ararkodai",
    storageBucket: "ararkodai.appspot.com",
    messagingSenderId: "235827349277",
    appId: "1:235827349277:web:91f35ebb4a2f667ce543f4",
    measurementId: "G-SHZZM5KTB6"
  });
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
// db.collection('todos').getDocs();
// const todosCol = collection(db, 'todos')
// const snapshot = await getDocs(todosCol);

// Detect auth state
// auth.onAuthStateChanged(user => {

// });

onAuthStateChanged(auth, user => {
    if(user != null){
        console.log("logged in!!")
    } else {
        console.log("No user")
    }
});