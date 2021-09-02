import React from "react";
import { useAuth } from "../contexts/authcontext";

const TestContext = () => {
    const { randomStr, setRandomStr } = useAuth()
    return (
        <div>
            <h1 style={{ color: "white", textAlign: "center" }}> Test Context</h1>

            <h1 style={{ color: "white", textAlign: "center" }}>

                {randomStr}

            </h1>
        </div>
    )
}

export default TestContext