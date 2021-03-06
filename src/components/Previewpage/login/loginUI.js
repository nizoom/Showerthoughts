import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./loginUI.css"

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";



import { useAuth } from "../../../contexts/authcontext";
import { passwordConfirmation } from "./loginfuncs/validatelogin";

import GoogleLogin from "./loginfuncs/existinguserloginfuncs";
import Header from "../../header/header";



const LoginUI = () => {

    const [newAccount, activateNewAccount] = useState(false);
    //newAccount true means show signup page 


    function activateSignup() {
        activateNewAccount(true)

    }

    function goBackToLogin() {
        activateNewAccount(false)


    }

    const history = useHistory()

    async function googleAuth(e) {
        await GoogleLogin(e)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user)
                history.push("/dashboard")
            }
            // else {
            //     // User is signed out
            //     // ...
            // }
        });
    }



    //LOGIN REFS
    const emailLoginRef = useRef();
    const passWordLoginRef = useRef();

    //SIGN UP REFS
    const emailRef = useRef();
    const userNameRef = useRef("");
    const passwordRef = useRef();
    const passwordConfirmRef = useRef()

    const { signup, login } = useAuth()
    const [error, setError] = useState()

    const [loading, setLoading] = useState(false)




    async function handleNewUserSubmit(e) {
        e.preventDefault()


        //cnfm pw match

        const validatePwds = passwordConfirmation(passwordRef.current.value, passwordConfirmRef.current.value)
        console.log(validatePwds)
        if (typeof validatePwds !== "string") {

            //create user 
            try {
                setLoading(true)
                const result = await signup(emailRef.current.value, passwordRef.current.value, userNameRef.current.value)
                // setUsername(userNameRef.current.value)

                if (typeof result !== "string") { //success block
                    // setUsername(userNameRef.current.value)

                    //back to login screen
                    goBackToLogin()
                    //clear ref values
                    emailLoginRef.current.value = ""
                    passWordLoginRef.current.value = ""
                    setError(null)
                } else { //invalid username 
                    setError(result)
                }
                setLoading(false) //reactivate buttons

            }
            catch (err) {
                setLoading(false)
                console.log("Failed to create an account")
                console.log(err.message)
                setError(err.message)
            }
        } else {
            //else set invalid pwds err
            setError(validatePwds)
        }

    }


    // useEffect(() => {
    //     // console.log("useEffect is going on ")
    //     // setUsername(userNameRef.current.value)
    //     console.log(userName)
    // }, [userName])



    async function handleSignIn(e) {
        e.preventDefault()
        try {
            //setError('') //reset error state
            setLoading(true)

            await login(emailLoginRef.current.value, passWordLoginRef.current.value)

            history.push("/dashboard")

        } catch (err) {
            //maybe add that console log message to validation function.
            console.log("Failed to sign in")
            console.log(err)
            setError(err.message)
            //etShowError(true)
            setLoading(false)
        }

    }




    return (
        <div>
            <Header />
            <div >
                {/* SIGN IN FORM */}

                {!newAccount ? <form className="login-box">
                    {error !== null ? <h1> {error} </h1> : null}
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
                        {error !== null ? <h1>{error} </h1> : null}

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
                            <button type="submit" className="submit-login-btn" disabled={loading}

                            > Sign up </button>
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