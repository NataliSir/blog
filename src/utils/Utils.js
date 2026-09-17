import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
let auth;
export function initFirebase() {
    //FIREBASE KONFIGURACIJA
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBWEBs0eNKZCz-nhWrJcL_btssnmOsHtf0",
        authDomain: "blog-store-561bd.firebaseapp.com",
        databaseURL: "https://blog-store-561bd-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "blog-store-561bd",
        storageBucket: "blog-store-561bd.firebasestorage.app",
        messagingSenderId: "466090246380",
        appId: "1:466090246380:web:db24b3054042c3b92da5c9",
        measurementId: "G-PWTKLEJFK7"
    };

    //Pokretanje Firebase aplikacije
    const app = initializeApp(firebaseConfig);
    //inicijalizacija autentifikacije
    auth = getAuth(app);
    //kreiranje Firestore baze
    const db = getFirestore(app);
}
export function getBlogAuth(){
    return auth
}
