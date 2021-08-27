import React from "react";
import Header from "../header/header";
import LoginBtn from "./login/loginbtn";
import NavMenu from "../navmenu/nav";

import "./landing.css"


const LandingPage = (props) => {


    return (
        <div className="preview-layout">
            <header className="header-layout">
                <Header className="title-component" />
                <LoginBtn className="loginBtn-component" />

            </header>
            {/* {activeUI ? <LoginUI /> : null} */}
            <NavMenu />

        </div>
    )
}


export default LandingPage