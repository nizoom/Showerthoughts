import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const app = firebase.initializeApp({

    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL

})



// console.log(process.env.REACT_APP_FIREBASE_API_KEY)

export const auth = app.auth();
export default app;


// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();

// export const firestore = firebase.firestore();