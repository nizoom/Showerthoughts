import React, { useRef } from "react";
import "./profile.css"
import { useAuth } from "../../contexts/authcontext";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn";
import NavMenu from "../navmenu/nav";
import { getUserInfo } from "../getdata/getuserdata";
import RenderFeed from "../renderfeed/renderfeed";


const ProfilePage = (props) => {

    const { accountData } = useAuth();




    //Make a state obj that assigns commonly used properties? 
    // const userInfoObj = {
    //     name: 
    // }

    const postsRef = useRef([])

    function allPosts() {
        console.log("called")

        //console.log(accountData[1]) //into the users folder
        console.log(accountData[1])

        //include postkey in allPostsArr
        let allPostsArr = [];

        for (const [postKey, postData] of Object.entries(accountData[1].posts)) {
            //console.log(`${key}: ${JSON.stringify(value)}`);
            //console.log(value)

            allPostsArr.push({ postData, postKey })
        }


        // console.log(allPostsArr)

        //setPreviousPosts(allPostsArr)
        postsRef.current = allPostsArr
        return allPostsArr;
    }

    if (accountData !== undefined) {
        allPosts()
        console.log(postsRef)
    }



    return (
        <div>
            <header className="header-wrapper">
                <Header />
                <LoginBtn />
            </header>
            <NavMenu />
            {postsRef.current.length > 0 ?
                < div >

                    <h2 style={{ textAlign: "center", color: "white" }}> {accountData[1].username}'s Profile Page </h2>
                    <section>
                        <h3 style={{ textAlign: "center", color: "white" }}>See all previous posts: </h3>

                        <div className="big-posts-wrapper">
                            {/* <button onClick={renderPosts}> </button> */}
                            {/* <ul>
                                {renderPosts}
                            </ul> */}

                            <RenderFeed postData={postsRef.current} deleteAccess={true}
                                username={accountData[1].username} page={"profile"} />
                        </div>
                    </section>

                </div>
                : null}

        </div >
    )
}

export default ProfilePage;