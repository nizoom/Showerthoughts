import React, { useState, useRef } from "react";
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
        setShowError(false)
    }

    function goBackToLogin() {
        activateNewAccount(false)
        setShowError(false)

    }

    const history = useHistory()

    async function googleAuth(e) {
        const user = await GoogleLogin(e)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log(user)
                history.push("/dashboard")
            } else {
                // User is signed out
                // ...
            }
        });
    }


    //LOGIN REFS
    const emailLoginRef = useRef();
    const passWordLoginRef = useRef();

    //SIGN UP REFS
    const emailRef = useRef();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef()

    const { signup, login, error, setError, currentUser } = useAuth()
    const [errorz, setErrorz] = useState()
    const [showError, setShowError] = useState(false)
    const [loading, setLoading] = useState(false)




    async function handleNewUserSubmit(e) {
        e.preventDefault()


        //cnfm pw match

        const validatePwds = passwordConfirmRef(passwordRef.current.value, passwordConfirmRef.current.value)

        if (validatePwds) {

            //create user 
            try {
                setLoading(true)
                //edit params
                await signup(emailRef.current.value, passwordRef.current.value, userNameRef.current.value)
                //back to login screen
                goBackToLogin()

            }
            catch (err) {
                setLoading(false)
                console.log("Failed to create an account")
                console.log(err.message)
                setErrorz(err.message)
            }
        } else {
            //else set invalid pwds err
            setErrorz(validatePwds)
        }



        //DONT FORGET TO CHANGE ERROR CONDITIONAL IN JSX




        // try {



        //     console.log(error)
        //     if (error === null) { //if no error
        //         goBackToLogin()
        //     }
        // } catch {
        //     console.log("Failed to create an account")
        //     //setError("Failed to create an account")
        // }
        // setLoading(false)

        //setShowError(true) //if there is an error then show it 

    }




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
            setErrorz(err.message)
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
                    {errorz !== null ? <h1> {errorz} </h1> : null}
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
                        {errorz !== null ? <h1>{error} </h1> : null}
                        {/* {currentUser && currentUser.email} */}
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

  // useEffect(() => {
    //     console.log("firing")
    //     if (currentUser !== null) {
    //         console.log('going to dashboard')
    //         history.push("/dashboard")
    //     }

    // }, [currentUser])