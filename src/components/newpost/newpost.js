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

    const [thoughtText, setThoughtText] = useState("")

    const [titleText, setTitleText] = useState("")

    const usernameRef = useRef()
    //save user data in refs 
    if (accountData !== undefined) {
        usernameRef.current = accountData[1].username
    }




    function handleNewPostSubmit(e) {
        e.preventDefault();
        //require text in forms 

        const body = thoughtText;
        const subject = titleText;

        // post submission to the db for that user 
        postNewThought(subject, body, usernameRef.current, determinePostSuccess)

    }

    function determinePostSuccess(boolean, err) {
        if (boolean) {
            console.log("callback: Data saved successfully in")
            setSuccessfulPostMessage(true)
            setTimeout(function () {  // fade out after 3 seconds
                setSuccessfulPostMessage(false)
                setThoughtText("")
                setTitleText("")
            }, 3000);
        } else {
            console.log('failed to add post')
            console.log(err)
            //display err
        }
    }


    return (
        <div>
            <header className="header-layout">
                <Header className="title-component" />
                <LoginBtn className="loginBtn-component" />

            </header>

            <NavMenu />
            {successfulPostMessage ? <h3 className="success"> message posted!</h3> : null}
            {accountData !== undefined ?
                <div className="post-form-wrapper">
                    <form onSubmit={handleNewPostSubmit}>
                        <h2> <b> <u> New Post from {usernameRef.current} </u></b> </h2>
                        <div className="subject-field">
                            <label htmlFor="subject"> Subject: </label>
                            <input type="text" name="text-thought" id="text-thought" value={titleText}
                                onChange={event => setTitleText(event.target.value)} />
                        </div>
                        <div className="textarea-field">
                            <textarea className="textarea is-primary" placeholder="I was thinking..." maxLength="500"
                                value={thoughtText} onChange={event => setThoughtText(event.target.value)}
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

//ref={subjectThoughtRef}

// ref={textThoughtRef}