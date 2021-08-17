import React, { useState, useRef } from "react";
import "./loginUI.css"

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

//import { sign } from "cookie-signature";

import { useAuth, currentUser } from "../../../contexts/authcontext";

import GoogleLogin from "./loginfuncs/existinguserloginfuncs.js"





const LoginUI = (props) => {

    const [newAccount, activateNewAccount] = useState(false);

    function activateSignup() {
        activateNewAccount(true)
    }

    const [signIn, setSignedIn] = useState(false);

    const [user, setUser] = useState({})


    async function googleAuth(e) {
        const user = await GoogleLogin(e)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user)
                pushUser(user)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });




    }
    //updates hooks to track user login
    function pushUser(user) {
        console.log("user is set")
        setUser(user)
        setSignedIn(true)
    }

    const emailRef = useRef();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef()

    const { signup, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleNewUserSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            console.log("Password dont match")

            return setError("Passwords do not match")
        }

        try {
            setError('') //reset error state
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            console.log("Failed to create an account")
            setError("Failed to create an account")
        }
        setLoading(false)


    }

    return (
        <div className="login-box">
            {!newAccount ? <form>
                <h2> Login </h2>
                <div className="username-field">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" name="username" id="username" />
                </div >
                <div className="password-field">
                    <label htmlFor="password"> Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="submit-login-div">
                    <button type="submit" className="submit-login-btn"> Submit </button>
                </div>
                <div className="create-account-instructions">

                    <hr />
                    <p> Click

                        <em style={{ color: "orange", cursor: "pointer" }}
                            onClick={activateSignup}
                        > Here </em>

                        to create an account</p>
                </div>
                <div className="login-with-google-div">
                    <button type="submit" className="submit-login-btn-google"
                        onClick={googleAuth}

                    > Or login with Google </button>
                </div>

            </form> :
                <form onSubmit={handleNewUserSubmit}>
                    {/* {error.length > 1 ? alert(error) : null} */}
                    {currentUser && currentUser.email}
                    <h2> Create an Account! </h2>
                    <div className="email-addy-field">
                        <label htmlFor="email-addy"> Email: </label>
                        <input type="email" name="email-addy" id="email-addy" ref={emailRef} />
                    </div>
                    <div className="username-field">
                        <label htmlFor="username"> Username: </label>
                        <input type="text" name="username" id="username" ref={userNameRef} />
                    </div >

                    <div className="password-field">
                        <label htmlFor="password"> Password: </label>
                        <input type="password" name="password" id="password" ref={passwordRef} />
                    </div>
                    <div className="password-cnfm-field">
                        <label htmlFor="password-cfrm"> Confirm Password : </label>
                        <input type="password" name="password-cnfrm" id="password-cnfrm" ref={passwordConfirmRef} />
                    </div>
                    <div className="submit-login-div">
                        <button type="submit" className="submit-login-btn" disabled={loading}> Submit </button>
                    </div>


                </form>
            }
        </div>
    )
}

export default LoginUI;