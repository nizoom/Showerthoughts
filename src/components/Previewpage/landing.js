import React from "react";
import Header from "../header/header";
import LoginBtn from "./login/loginbtn";
import NavMenu from "../navmenu/nav";
import { useAuth } from "../../contexts/authcontext";
import { useHistory } from "react-router";

import { testFunction } from "./login/loginfuncs/validatelogin";

import "./landing.css"


const LandingPage = (props) => {

    // const { context, setContext } = useAuth()

    const { randomStr, setRandomStr } = useAuth();



    const history = useHistory()

    function handleClick() {
        history.push("./test")
    }

    function handleUpdate(str) {
        const update = testFunction(str)
        setRandomStr(update)
    }

    return (
        <div className="preview-layout">
            <header className="header-layout">
                <Header className="title-component" />
                <LoginBtn className="loginBtn-component" />

            </header>
            {/* {activeUI ? <LoginUI /> : null} */}
            <NavMenu />
            <div>
                <h3 style={{ color: "white", margin: "20%", textAlign: "center" }}>
                    {randomStr}
                </h3>

                <button type="button"
                    onClick={() => (handleUpdate(randomStr))}
                > Change Context! </button>



                <button onClick={handleClick}>
                    Go to test page
                </button>


            </div>
        </div >
    )
}


export default LandingPage