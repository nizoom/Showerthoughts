import React from "react";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn";
const NewPostPage = (props) => {
    return (
        <div>
            <header className="header-layout">
                <Header className="title-component" />
                <LoginBtn className="loginBtn-component" />


            </header>
            <h2> New Post </h2>

        </div>
    )
}

export default NewPostPage;