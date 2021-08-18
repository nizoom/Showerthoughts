import React from "react";
import Header from "../header/header";
import LoginBtn from "./login/loginbtn";

import "./landing.css"


const LandingPage = (props) => {

    // const [activeUI, setActiveUI] = useState(false)

    // function RevealLoginUI(e) {
    //     setActiveUI(true)
    // }

    return (
        <div className="preview-layout">
            <header className="header-layout">
                <Header className="title-component" />
                <LoginBtn className="loginBtn-component" />
            </header>
            {/* {activeUI ? <LoginUI /> : null} */}
        </div>
    )
}


export default LandingPage