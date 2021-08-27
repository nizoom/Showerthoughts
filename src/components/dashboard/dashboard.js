import React, { useEffect, useState } from "react";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn"
import "./dashboard.css"
import { useAuth } from "../../contexts/authcontext";
import NavMenu from "../navmenu/nav"
import { getUserInfo } from "../getuserdata/getuserdata";

const Dashboard = () => {

    const { currentUser, username, storeUserInfo } = useAuth();
    const [account, setAccount] = useState("")


    useEffect(() => {

        getUserInfo(currentUser.email, callback)

        function callback(foundAccount) {
            console.log(foundAccount)
            //set for display on dashboard
            setAccount(foundAccount[1])
            //store in auth context for other components to use 
            storeUserInfo(foundAccount)
        }


    }, [username])


    return (
        <div>
            <div className="header-wrapper">
                <Header />
                <LoginBtn />
            </div>
            <NavMenu account={account} />
            <div className="dashboard-wrapper">
                <p> <em>  Dashboard Page </em></p>
                <h2> <em> Email: </em> {currentUser.email}</h2>
                <h2> username :{account.username}</h2>
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


        </div >
    )
}

export default Dashboard
