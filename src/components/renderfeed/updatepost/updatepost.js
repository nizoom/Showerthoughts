import React, { useState } from "react";
import { updatePostonDB } from "../../postuserdata/postuserdata";
import "./updatepost.css"

const UpdatePost = (props) => {
    const [updateText, setUpdateText] = useState()

    async function handleSubmit(e) {
        e.preventDefault();
        //console.log(updateText)
        //update firebase func
        await updatePostonDB(props.postkey, props.username, updateText, errorCallback)
        //reset profile view to default
        props.reset()
    }

    function errorCallback(updateStatus) {
        if (updateStatus) {
            console.log("update success")
        } else {
            console.log("update failed")
        }
    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <h3> {props.title} </h3>
                <textarea defaultValue={props.body} onChange={(event) => setUpdateText(event.target.value)}
                    rows="4" cols="50"
                >


                </textarea>
                <button type="submit" className="submit-update-btn"> Update </button>
            </form>
        </div>
    )
}

export default UpdatePost