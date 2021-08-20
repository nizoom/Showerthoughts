import React from "react";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn"
import "./dashboard.css"
import { useAuth } from "../../contexts/authcontext";

const Dashboard = (props) => {

    const { currentUser } = useAuth();
    //console.log(currentUser)
    return (
        <div>
            <div className="header-wrapper">
                <Header />
                <LoginBtn />
            </div>

            <div className="dashboard-wrapper">

                <h2> <em> Email: </em> {currentUser.email}</h2>
                <h2> Dashboard</h2>
                <section>
                    <h3> Posts </h3>
                    <h3> Feed </h3>
                    <h3> New Showerthought</h3>
                </section>
            </div>


        </div>
    )
}

export default Dashboard