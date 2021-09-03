import React from "react";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn"
import "./dashboard.css"
import { useAuth } from "../../contexts/authcontext";
import NavMenu from "../navmenu/nav"

const Dashboard = () => {

    const { currentUser, accountData } = useAuth();
    // console.log(accountData)

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

        </div >

    )
}

export default Dashboard
