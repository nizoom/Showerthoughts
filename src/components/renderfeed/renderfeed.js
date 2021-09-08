import React, { useState, useRef } from "react";

import "./renderfeed.css"
import { deletePost } from "../postuserdata/postuserdata";


const RenderFeed = (props) => {

    // const [deleteCounter, setDeleteCounter] = useState(0)

    const deletCounterRef = useRef(1)

    const [deleteState, setDeleteState] = useState("X")

    const [clickedPost, setClickedPost] = useState()

    function handleDeleteClick(key) {

        //if key === key then do below 
        if (key === clickedPost) {
            console.log("caught")
            deletCounterRef.current += 1
        }
        setClickedPost(key)
        //else / either way just render 
        renderDeleteBtn(key)
    }

    //sets delete btn state
    function renderDeleteBtn(key) {
        console.log(deletCounterRef.current)
        switch (deletCounterRef.current) {

            case 1:
                console.log("delete")
                setDeleteState("delete?")
                break;
            case 2:
                deletePost(key, props.username)
                deletCounterRef.current = 1;
                setClickedPost(null)
                break;
        }
    }

    //use post id as the key and to select delete rendering 
    // console.log(props.postData)

    //const [postObj, setPostObj] = useState()

    // if(props.page = "profile"){
    //     setPostObj({

    //     })
    // }

    const renderPosts = props.postData.map((post) => {
        //const id = post.postData.postid;
        console.log(post)
        const title = post.postData.title
        const body = post.postData.body
        const postkey = post.postKey;


        return (
            < li key={postkey} className="post-wrapper">
                <article className="article-wrapper">

                    {props.deleteAccess ? <button type="text" className="delete-btn"
                        onClick={() => handleDeleteClick(postkey)}>

                        {postkey === clickedPost ? < p > {deleteState}</p> : "X"}

                    </button> : null}

                    <h3 className="post-title"> {title}</h3>
                    <p className="post-body"> {body} </p>
                </article>
            </li >)

    })


    const renderFeedPosts = null

    return (
        <div>
            {renderPosts}
            {/* {props.page = "profile" ? renderProfilePosts : null} */}
        </div>
    )
}

export default RenderFeed