import React, { useEffect } from "react";
import "./profile.css"
import { useAuth } from "../../contexts/authcontext";
import Header from "../header/header";


const ProfilePage = (props) => {

    useEffect(() => {
        console.log("rendering")
    })
    return (
        <div>
            <Header />
            <h1> Profile Page </h1>

        </div>
    )
}

export default ProfilePage;