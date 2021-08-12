import React from "react";
import "./login.css"

const LoginBtn = (props) => {
    return (
        <div className="login-btn-wrapper">
            <button style={{ margin: "20px" }} className="login-btn">
                Login
            </button>
        </div >
    )
}

export default LoginBtn;