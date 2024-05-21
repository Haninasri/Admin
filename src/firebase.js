//import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
const firebaseConfig = 
{
    apiKey: "AIzaSyA8BEAB5LK_HY6fdf0Cu7wRGxVsFRzAp00",
    authDomain: "admin-773e7.firebaseapp.com",
    projectId: "admin-773e7",
    storageBucket: "admin-773e7.appspot.com",
    messagingSenderId: "294818858704",
    appId: "1:294818858704:web:9a14617162e39b3b1000d5",
    measurementId: "G-WNPTG4JWGK"
};

const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = firebase.firestore(app)