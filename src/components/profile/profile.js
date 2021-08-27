import React, { useEffect } from "react";
import "./profile.css"
import { useAuth } from "../../contexts/authcontext";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn";


const ProfilePage = (props) => {

    const { userInfo } = useAuth();

    console.log(userInfo)

    useEffect(() => {
        console.log(userInfo)
    })
    return (
        <div>
            <Header />
            <LoginBtn />
            <h1 style={{ textAlign: "center", color: "white" }}> Profile Page </h1>

        </div>
    )
}

export default ProfilePage;