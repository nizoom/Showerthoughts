import React, { useCallback, useEffect, useState } from "react";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn"
import "./dashboard.css"
import { useAuth } from "../../contexts/authcontext";
import NavMenu from "../navmenu/nav"
import { getUserInfo } from "../getuserdata/getuserdata";

const Dashboard = () => {

    const { currentUser, accountData } = useAuth();
    console.log(accountData)

    const [account, setAccount] = useState("")

    useEffect(() => {
        setAccount(accountData)
    }, [accountData])
    // useEffect(() => {

    //     getUserInfo(currentUser.email, callback)

    //     function callback(foundAccount) {
    //         console.log(foundAccount)
    //         //set for display on dashboard
    //         setAccount(foundAccount[1])
    //         //store in auth context for other components to use 
    //         //storeUserInfo(foundAccount)
    //     }


    // }, [username])

    // { accountData === !undefined ? : null }
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
                    <h2> username :</h2>
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
