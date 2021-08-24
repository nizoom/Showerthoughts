import React, { useEffect, useState } from "react";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn"
import "./dashboard.css"
import { useAuth } from "../../contexts/authcontext";
import NavMenu from "../navmenu/nav"
import { getUserInfo } from "../getuserdata/getuserdata";

const Dashboard = () => {

    const { currentUser, username } = useAuth();
    const [account, setAccount] = useState("")


    useEffect(() => {

        getUserInfo(currentUser.email, callback)

        function callback(foundAccount) {
            console.log(foundAccount)
            setAccount(foundAccount[1])
        }


        // console.log(accountFound)
        // setAccount(accountFound)

    }, [username])


    return (
        <div>
            <div className="header-wrapper">
                <Header />
                <LoginBtn />
            </div>
            <NavMenu />
            <div className="dashboard-wrapper">

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

{/* <h3> Posts </h3>
                    <h3> Feed </h3>
                    <h3> New Showerthought</h3> */}