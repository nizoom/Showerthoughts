import React, { useRef } from "react";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn";
import NavMenu from "../navmenu/nav";
import "./newpost.css";

const NewPostPage = (props) => {

    const headerThoughtRef = useRef();

    const textThoughtRef = useRef();

    function handleNewPostSubmit(e) {
        e.preventDefault();
        //require text in forms 

        // post submission to the db for that user 
        console.log(headerThoughtRef.current.value)
        console.log(textThoughtRef.current.value)
    }

    return (
        <div>
            <header className="header-layout">
                <Header className="title-component" />
                <LoginBtn className="loginBtn-component" />

            </header>
            <NavMenu />
            <div className="post-form-wrapper">
                <form onSubmit={handleNewPostSubmit}>
                    <h2> <b> <u> New Post </u></b> </h2>
                    <div className="subject-field">
                        <label htmlFor="subject"> Subject: </label>
                        <input type="text" name="text-thought" id="text-thought" ref={headerThoughtRef} />
                    </div>
                    <div className="textarea-field">
                        <textarea className="textarea is-primary" placeholder="I was thinking..." maxLength="500"
                            ref={textThoughtRef}
                        ></textarea>
                    </div>
                    <div className="submit-newpost-wrapper">
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default NewPostPage;

{/* <div className="username-field">
<label htmlFor="username"> Email: </label>
<input type="email" name="email" id="email" ref={emailLoginRef} />
</div > */}