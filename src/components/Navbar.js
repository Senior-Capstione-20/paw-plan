import React from "react";

const Navbar = () => {
    return (
        /* TO-DO 
            - Create clickable elements
            - Change NavBar to react if a user is logged in
        */
        <div class="navbar">
            <div class="left">
                <a class="paw-plan" href='/'><span>paw-plan</span></a>
                <div class="buttons-group">
                    <div class="menu-item">
                        <a class="button-text" href='/about'>About</a>
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