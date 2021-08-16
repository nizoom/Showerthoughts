import React, { useState, useEffect } from "react";


import "./loginbtn.css"
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import { useAuth } from "../../../contexts/authcontext";
import { sign } from "cookie-signature";



const LoginBtn = (props) => {

    const [signIn, setSignedIn] = useState(false);

    const [user, setUser] = useState({})

    const { signup } = useAuth();


    function handleSubmit(e) {
        e.preventDefault()

        //signup(email, password)
    }

    function Login() {
        console.log("login clicked!")
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                //  @type {firebase.auth.OAuthCredential} 
                const credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user

                pushUser()

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

    }

    //updates hooks to track user login
    function pushUser() {
        setUser(user)
        setSignedIn(true)
    }

    //logs user out 
    function Logout() {
        firebase.auth().signOut();
        setSignedIn(false)

    }


    function passBackUIActivation() {
        props.returnUIActivation(true)
    }

    return (
        <div>
            <div className="login-btn-wrapper">
                {!signIn ? <button className="login-btn" onClick={passBackUIActivation}>
                    Login
                </button> :
                    <button className="login-btn" onClick={Logout}>
                        Logout
                    </button>
                }
            </div >


        </div>
    )
}

export default LoginBtn;