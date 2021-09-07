import React, { useRef } from "react";
import "./profile.css"
import { useAuth } from "../../contexts/authcontext";
import Header from "../header/header";
import LoginBtn from "../Previewpage/login/loginbtn";
import NavMenu from "../navmenu/nav";
import { getUserPosts } from "../getuserdata/getuserdata";
import RenderFeed from "../renderfeed/renderfeed";


const ProfilePage = (props) => {

    const { accountData } = useAuth();


    // console.log(accountData)

    //Make a state obj that assigns commonly used properties? 
    // const userInfoObj = {
    //     name: 
    // }

    const postsRef = useRef([])

    function allPosts() {
        console.log("called")
        const allPostsObj = accountData[1].posts
        const allPostsArr = Object.values(allPostsObj).map((value) => {
            return value
        })
        console.log(allPostsArr)
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

                            <RenderFeed postData={postsRef.current} deleteAccess={true} />
                        </div>
                    </section>

                </div>
                : null}

        </div >
    )
}

export default ProfilePage;