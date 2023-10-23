import React from "react";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left">
                <a className="paw-plan" href="/"><span>paw-plan</span></a>
                <div className="buttons-group">
                    <div className="menu-item">
                        <a className="nav-link" href="/about">About</a>
                    </div>
                    <div className="menu-item">
                        <a className="nav-link" href="/dashboard">Dashboard</a>
                    </div>
                </div>
            </div>
            <div className="buttons-group1">
                <div className="button">
                    <div className="text-container">
                        <div className="button-text">Log In</div>
                    </div>
                </div>
                <div className="button1">
                    <div className="text-container">
                        <div className="button-text">Register</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
