import React, { useState } from "react";


const UpdatePost = (props) => {
    const [updateText, setUpdateText] = useState()

    function handleSubmit(e) {
        e.preventDefault();
        console.log(updateText)
        //update firebase func
    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <h3> {props.title} </h3>
                <textarea defaultValue={props.body} onChange={(event) => setUpdateText(event.target.value)}>


                </textarea>
                <button type="submit"> Update </button>
            </form>
        </div>
    )
}

export default UpdatePost