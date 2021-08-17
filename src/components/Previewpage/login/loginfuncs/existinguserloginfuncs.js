import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

//When logging in with google
export default async function GoogleLogin(e) {
    e.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await firebase.auth().signInWithPopup(provider)
        .then((result) => {
            //  @type {firebase.auth.OAuthCredential} 
            const credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user


            return user;
            // .then((user) => console.log(user))
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const errCredential = error.credential;
            // ...
        }).catch((error => console.log(error)))
    console.log(user)
    return user;

}