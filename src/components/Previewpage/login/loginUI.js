import React, { useState } from "react";
import "./loginUI.css"

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";


const LoginUI = (props) => {

    const [newAccount, activateNewAccount] = useState(false);

    function activateSignup() {
        activateNewAccount(true)
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
                    <button type="submit" className="submit-login-btn-google"> Or login with Google </button>
                </div>

            </form> :
                <form>
                    <h2> Create an Account! </h2>
                    <div className="email-addy-field">
                        <label htmlFor="email-addy"> Password: </label>
                        <input type="email" name="email-addy" id="email-addy" />
                    </div>
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


                </form>
            }
        </div>
    )
}

export default LoginUI;