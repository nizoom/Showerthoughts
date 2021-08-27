import React, { useEffect } from "react";
import "./profile.css"
import { useAuth } from "../../contexts/authcontext";


const ProfilePage = (props) => {

    useEffect(() => {
        console.log("rendering")
    })
    return (
        <div>
            <h1> Profile Page </h1>

        </div>
    )
}

export default ProfilePage;