import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"

import "./loginbtn.css"

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { useAuth } from "../../../contexts/authcontext";



// import { sign } from "cookie-signature";



const LoginBtn = (props) => {

    const [signIn, setSignedIn] = useState(false);

    //logs user out 

    const { logout, currentUser } = useAuth();
    const history = useHistory();


    // function passBackUIActivation() {
    //     props.returnUIActivation(true)
    // }

    async function Logout() {
        try {
            await logout();
            history.push("/")
        } catch {
            console.log("failed to logout")
        }
    }


    return (
        <div>
            <div className="login-btn-wrapper">
                {currentUser === null ?
                    <Link to="/login">
                        <button className="login-btn">
                            Login
                        </button>
                    </Link> :

                    <button className="login-btn" onClick={Logout}>
                        Logout
                    </button>
                }
            </div >
        </div>
    )
}

export default LoginBtn;