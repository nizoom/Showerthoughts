import React from "react";
import "./loginUI.css"


const LoginUI = (props) => {
    return (
        <div className="login-box">
            <form>
                <h2> Login </h2>
                <div className="username-field">
                    <label htmlFor="username"> Username: </label>
                    <input type="text" name="username" id="username" />
                </div >
                <div className="password-field">
                    <label htmlFor="password"> Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                <div>
                    <button type="submit" className="submit-login"> submit </button>
                </div>

                <h3> Click [here] to create an account</h3>


            </form>
        </div>
    )
}

export default LoginUI;