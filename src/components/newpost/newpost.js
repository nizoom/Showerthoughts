import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/authcontext";
import { postNewThought } from "../postuserdata/postuserdata";

import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn";
import NavMenu from "../navmenu/nav";
import "./newpost.css";


const NewPostPage = (props) => {

    const { accountData } = useAuth();

    const [successfulPostMessage, setSuccessfulPostMessage] = useState(false)


    const usernameRef = useRef()
    //save user data in refs 
    if (accountData !== undefined) {
        usernameRef.current = accountData[1].username
    }

    const subjectThoughtRef = useRef();

    const textThoughtRef = useRef();


    function handleNewPostSubmit(e) {
        e.preventDefault();
        //require text in forms 

        // post submission to the db for that user 
        const subject = subjectThoughtRef.current.value
        const body = textThoughtRef.current.value
        // console.log(headerThoughtRef.current.value)
        // console.log(textThoughtRef.current.value)
        postNewThought(subject, body, usernameRef)
    }

    return (
        <div>
            <header className="header-layout">
                <Header className="title-component" />
                <LoginBtn className="loginBtn-component" />

            </header>

            <NavMenu />
            {accountData !== undefined ?
                <div className="post-form-wrapper">
                    <form onSubmit={handleNewPostSubmit}>
                        <h2> <b> <u> New Post from {usernameRef.current} </u></b> </h2>
                        <div className="subject-field">
                            <label htmlFor="subject"> Subject: </label>
                            <input type="text" name="text-thought" id="text-thought" ref={subjectThoughtRef} />
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
                : null}

        </div >
    )
}

export default NewPostPage;

// () => establishUsername(accountData[1].username)