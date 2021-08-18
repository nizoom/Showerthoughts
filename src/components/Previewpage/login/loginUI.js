import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./loginUI.css"

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

//import { sign } from "cookie-signature";

import { useAuth } from "../../../contexts/authcontext";

import GoogleLogin from "./loginfuncs/existinguserloginfuncs";
import Header from "../../header/header";




const LoginUI = (props) => {

    console.log("UI APPEAR")

    const [newAccount, activateNewAccount] = useState(false);

    function activateSignup() {
        activateNewAccount(true)
    }

    function goBackToLogin() {
        activateNewAccount(false)
    }

    // const [signIn, setSignedIn] = useState(false);

    // const [user, setUser] = useState({})

    const history = useHistory()



    async function googleAuth(e) {
        const user = await GoogleLogin(e)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user)
                // pushUser(user)
                // ...
                history.push("/dashboard")
            } else {
                // User is signed out
                // ...
            }
        });




    }
    //updates hooks to track user login
    // function pushUser(user) {
    //     console.log("user is set")
    //     setUser(user)
    //     setSignedIn(true)
    // }

    //LOGIN REFS
    const emailLoginRef = useRef();
    const passWordLoginRef = useRef();

    //SIGN UP REFS
    const emailRef = useRef();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef()

    const { signup, currentUser, login } = useAuth()
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

    async function handleSignIn(e) {
        e.preventDefault()
        try {
            setError('') //reset error state
            setLoading(true)
            await login(emailLoginRef.current.value, passWordLoginRef.current.value)
            setLoading(false)
            history.push("/dashboard")
        } catch {
            console.log("Failed to sign in")
            setError("failed to sign in")
            setLoading(false)
        }
        // setLoading(false)
    }

    return (
        <div>
            <Header />
            <div >
                {/* SIGN IN FORM */}
                {!newAccount ? <form className="login-box">
                    <h2> Login </h2>
                    <div className="username-field">
                        <label htmlFor="username"> Email: </label>
                        <input type="email" name="email" id="email" ref={emailLoginRef} />
                    </div >
                    <div className="password-field">
                        <label htmlFor="password"> Password: </label>
                        <input type="password" name="password" id="password" ref={passWordLoginRef} />
                    </div>
                    <div className="submit-login-div">
                        <button type="submit" className="submit-login-btn"
                            onClick={handleSignIn}
                        > Submit </button>
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
                    // SIGN UP FORM
                    <form onSubmit={handleNewUserSubmit} className="create-account-box">
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
                            <button type="submit" className="submit-login-btn" disabled={loading}> Sign up </button>
                        </div>
                        <div className="submit-login-div">
                            <button type="submit" className="submit-login-btn" disabled={loading}
                                onClick={goBackToLogin}
                            > Already have an account?
                            </button>
                        </div>


                    </form>
                }
            </div>
        </div>
    )
}

export default LoginUI;