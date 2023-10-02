import React from "react";

const Navbar = () => {
    return (
        /* TO-DO 
            - Create clickable elements
            - Change NavBar to react if a user is logged in
        */
        <div class="navbar">
                <div class="left">
                    <b class="paw-plan"><span>paw-plan</span></b>
                    <div class="buttons-group">
                        <div class="menu-item">
                            <div class="button-text">About</div>
                        </div>
                    </div>
                </div>
            <div class="buttons-group1">
                <div class="button">
                    <div class="text-container">
                        <div class="button-text">Log In</div>
                    </div>
                </div>
                <div class="button1">
                    <div class="text-container">
                        <div class="button-text">Register</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;