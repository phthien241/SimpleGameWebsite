import React from "react";
import "./Navbar.scss";
import logo from '../../assets/images/logo.png'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="w-full flex items-center justify-between px-12">
        <img src={logo} alt="logo" className="w-30 h-24"></img>
        <ul className="navbar flex text-lg font-semibold">
          <li className="mr-5">
            <a href="#home" className="text-black">
              Home
            </a>
          </li>
          <li className="mr-5">
            <a href="#games" className="text-black">
              Games
            </a>
          </li>
          <li className="mr-5">
            <Link className="text-lg font-semibold" to="/social">Social</Link>
          </li>
        </ul>
        <Link className="text-lg font-semibold" to="/sign-in">Sign In</Link> 
      </nav>
    </>
  );
}

export default Navbar;
