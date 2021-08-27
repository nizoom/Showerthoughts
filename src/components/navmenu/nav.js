import React, { useState } from "react"
import { BrowserRouter as Link } from "react-router-dom";
import "./nav.css"
import { auth } from "../../firebase/firebase";

const NavMenu = (props) => {

    const [menu, setMenu] = useState(false);

    function toggleMenu() {
        setMenu(!menu)
    }


    return (
        <div>
            <nav>
                {!menu ? <button className="menu-btn" onClick={toggleMenu}>
                    Menu
                </button> :

                    <div className="active-menu-wrapper">
                        <button>
                            Feed
                        </button>

                        <button>
                            <Link to="/profile"> Profile</Link>

                        </button>

                        <button>
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