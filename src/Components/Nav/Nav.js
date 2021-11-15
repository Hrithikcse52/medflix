import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
            <Link className="link" to="/dashboard">
              Dashboard
            </Link>
            <li>Home</li>
            <li>Home</li>
          </ul>

          <div className="auth">
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Link to="/login">Login</Link>
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
