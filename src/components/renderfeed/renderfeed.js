import { render } from "@testing-library/react";
import React from "react";

import "./renderfeed.css"

const RenderFeed = (props) => {

    const renderPosts = props.postData.map((post) => {

        return (
            < li key={props.postData.indexOf(post)} className="post-wrapper">
                <article className="article-wrapper">
                    <h3 className="post-title"> {post.title}</h3>
                    <p className="post-body"> {post.body} </p>
                </article>
            </li>)

    })

    return (
        <div>
            {renderPosts}
        </div>
    )
}

export default RenderFeed