import React, { useState } from "react";

import "./renderfeed.css"


const RenderFeed = (props) => {

    const [deleteCounter, setDeleteCounter] = useState(0)

    const [deleteState, setDeleteState] = useState("X")

    const [clickedPost, setClickedPost] = useState()

    function handleDeleteClick(id) {
        console.log("yo1")
        //if key === key then do below 
        setDeleteCounter(deleteCounter + 1)

        setClickedPost(id)
        //else / either way just render 
        renderDeleteBtn()
    }

    //sets delete btn state
    function renderDeleteBtn() {
        console.log("yo")
        switch (deleteCounter) {
            case 0:
                setDeleteState("X")
            case 1:
                setDeleteState("delete?")
            case 2:
                //delete func 
                setDeleteCounter(0);
                setClickedPost(null)
                break;
        }
    }

    //use post id as the key and to select delete rendering 
    console.log(props.postData)
    const renderPosts = props.postData.map((post) => {

        return (
            < li key={post.postid} className="post-wrapper">
                <article className="article-wrapper">

                    {props.deleteAccess ? <button type="text" className="delete-btn"
                        onClick={() => handleDeleteClick(post.postid)}>

                        {post.postid === clickedPost ? < p > {deleteState}</p> : "X"}

                    </button> : null}

                    <h3 className="post-title"> {post.title}</h3>
                    <p className="post-body"> {post.body} </p>
                </article>
            </li >)

    })

    return (
        <div>
            {renderPosts}
        </div>
    )
}

export default RenderFeed