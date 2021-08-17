import React, { useState } from "react";
import Header from "../header/header";
import LoginBtn from "./login/loginbtn";

import "./landing.css"
import LoginUI from "./login/loginUI";

const LandingPage = (props) => {

    const [activeUI, setActiveUI] = useState(false)

    function RevealLoginUI(e) {
        setActiveUI(true)
    }

    return (
        <div className="preview-layout">
            <header className="header-layout">
                <Header className="title-component" />
                <LoginBtn className="loginBtn-component" returnUIActivation={RevealLoginUI} />
            </header>
            {/* {activeUI ? <LoginUI /> : null} */}
        </div>
    )
}


export default LandingPage