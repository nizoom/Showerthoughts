import React, { useState } from "react";


import "./loginbtn.css"
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import { useAuth } from "../../../contexts/authcontext";
// import { sign } from "cookie-signature";



const LoginBtn = (props) => {

    const [signIn, setSignedIn] = useState(false);

    const [user, setUser] = useState({})

    const { signup } = useAuth();


    function handleSubmit(e) {
        e.preventDefault()

        //signup(email, password)
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