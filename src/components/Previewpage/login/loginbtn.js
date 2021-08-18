import React, { useState } from "react";
import { Link } from "react-router-dom"

import "./loginbtn.css"

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";


// import { sign } from "cookie-signature";



const LoginBtn = (props) => {

    const [signIn, setSignedIn] = useState(false);




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
                {!signIn ?
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