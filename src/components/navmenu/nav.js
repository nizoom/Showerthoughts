import React, { useState } from "react"
import { BrowserRouter as Link, useHistory } from "react-router-dom";
import "./nav.css"
// import { auth } from "../../firebase/firebase";

const NavMenu = (props) => {

    const [menu, setMenu] = useState(false);

    function toggleMenu() {
        setMenu(!menu)
    }
    const history = useHistory();

    function pageClick(pageName) {
        history.push(`./${pageName}`)
    }

    return (
        <div>
            <nav>
                {!menu ? <button className="menu-btn" onClick={toggleMenu}>
                    Menu
                </button> :

                    <div className="active-menu-wrapper">
                        <button onClick={() => pageClick("dashboard")}>
                            Feed
                        </button>

                        <button onClick={() => pageClick("profile")}>
                            Profile
                        </button>

                        <button onClick={() => pageClick("newpost")}>
                            New Showerthought
                        </button>

                        <button onClick={toggleMenu}>
                            Hide
                        </button>
                    </div>

                }


            </nav>

        </div>
    )
}

export default NavMenu;