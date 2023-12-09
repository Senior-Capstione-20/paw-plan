import React, {useEffect, useState} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import useFirebaseAuthentication from '../useFirebaseAuthentication';

const Navbar = () => {
  const user = useFirebaseAuthentication();

  return (
    <div className="navbar">
      <div className="left">
        <a className="paw-plan" href="/">
          <span>paw-plan</span>
        </a>
        <div className="buttons-group">
          <div className="menu-item">
            <a className="nav-link" href="/about">
              About
            </a>
          </div>
        </div>
      </div>

        {/* If a user is logged in, show the dashboard and profile*/}
        {user ? (
          <div className="buttons-group1">
            <div className="menu-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </div>
            <div className="menu-item">
                <a className="nav-link" href="/petregistration">
                   Pet Registration
                </a>
            </div>
            <div className="menu-item">
                <a className="nav-link" href="/doghouse">
                   Dog House
                </a>
            </div>
            <div className="button1">
                <div className="text-container">
                  <a className="nav-link" href="/profile">
                    Profile
                  </a>
                </div>
            </div>
          </div>
          ) : (
            <div className="buttons-group1">
              <div className="button">
                <div className="text-container">
                  <a className="nav-link" href="/login">
                    Log In
                  </a>
                </div>
              </div>
              <div className="button1">
                <div className="text-container">
                  <a className="nav-link" href="/registration">
                    Register
                  </a>
                </div>
            </div>
            </div>
          )}
      </div>
  );
};

export default Navbar;
