import React, { useEffect } from "react";
import "./profile.css"
import { useAuth } from "../../contexts/authcontext";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn";
import NavMenu from "../navmenu/nav";


const ProfilePage = (props) => {

    const { userInfo } = useAuth();


    //Make a state obj that assigns commonly used properties? 
    // const userInfoObj = {
    //     name: 
    // }

    useEffect(() => {
        console.log(userInfo)
    })
    return (
        <div>
            <header className="header-wrapper">
                <Header />
                <LoginBtn />
            </header>
            <NavMenu />
            <h2 style={{ textAlign: "center", color: "white" }}> {userInfo}'s Profile Page </h2>
            <section>
                <h3 style={{ textAlign: "center", color: "white" }}>See all previous posts: </h3>
            </section>


        </div>
    )
}

export default ProfilePage;