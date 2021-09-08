import React, { useRef, useEffect } from "react";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn"
import "./dashboard.css"
import { useAuth } from "../../contexts/authcontext";
import NavMenu from "../navmenu/nav"
import { getFeed } from "../getdata/getdata";
import RenderFeed from "../renderfeed/renderfeed";

const Dashboard = () => {

    const { currentUser, accountData } = useAuth();

    const currentUserRef = useRef();
    const accountDataRef = useRef();
    const postDataRef = useRef();

    //get, format, and store feed in useRef
    useEffect(() => {
        (async function () {
            await getFeed(callback)

            function callback(postsdata) {
                console.log(postsdata)
                postDataRef.current = postsdata;
            }
        })();
    })




    //save user in a ref
    if (currentUser !== undefined) {
        currentUserRef.current = currentUser;
    }

    //save account data in a ref
    if (accountData !== undefined) {
        accountDataRef.current = accountData
    }

    return (

        <div>

            <div className="header-wrapper">
                <Header />
                <LoginBtn />
            </div>

            <NavMenu />
            {accountData !== undefined ?
                <div className="dashboard-wrapper">
                    <p> <em>  Dashboard Page </em></p>
                    <h2> <em> Email: </em> {currentUser.email}</h2>
                    <h2> username : {accountData[1].username}</h2>
                    <h2> Shower-induced thoughts near you: </h2>

                    <section className="feed-wrapper">
                        <ul className="feed-list">
                            <li>
                                <article> <u> Post 1, from Thaddeus McThot </u></article>
                            </li>
                            <li>
                                <article> <u> Post 2, from Nissua Pappise </u></article>
                            </li>
                        </ul>

                    </section>
                </div>
                : null}

            <button onClick={getFeed}> get Feed</button>
            <RenderFeed deleteAccess={false} postData={postDataRef.current} page={"feed"} />

        </div >

    )
}

export default Dashboard
