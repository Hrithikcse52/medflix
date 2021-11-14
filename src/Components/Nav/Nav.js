import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
const Nav = () => {
  return (
    <nav>
      <div className="nav_container">
        <div className="left_side">
          <h1 id="link">
            <Link className="link" to="/">
              Logo
            </Link>
          </h1>
        </div>
        <div className="right_side">
          <ul className="nav_links">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
          </ul>
          <div className="auth">
            <Link to="/login">Login</Link>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
