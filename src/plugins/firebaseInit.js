import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA8h3UP1qPuYuMOWjin7QB-oQejZ7SkBk0",
    authDomain: "job-scraper-35fd5.firebaseapp.com",
    projectId: "job-scraper-35fd5",
    storageBucket: "job-scraper-35fd5.appspot.com",
    messagingSenderId: "1024902610193",
    appId: "1:1024902610193:web:6583a693160529406560b0",
    measurementId: "G-4QTRDZM5H7"
};

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
};

export default firebase;