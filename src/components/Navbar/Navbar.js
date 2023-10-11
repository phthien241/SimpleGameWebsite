import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import user_ava from "../../assets/images/user_ava.png";

const Navbar = () => {
  const [name, setName] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("fname"));
  }, []);

  return (
    <>
      <nav
        className={`w-full flex items-center justify-between px-12 sticky top-0 z-50`}
      >
        <img src={logo} alt="logo" className="w-30 h-24"></img>
        <ul className="navbar flex text-lg font-semibold">
          <li className="mr-5">
            <Link className="text-lg font-semibold" to="/">
              Home
            </Link>
          </li>
          <li className="mr-5">
            <Link className="text-lg font-semibold" to="/game-list">
              Game
            </Link>
          </li>
          <li className="mr-5">
            <Link className="text-lg font-semibold" to="/social">
              Social
            </Link>
          </li>
        </ul>
        {!name && (
          <Link className="text-lg font-semibold" to="/sign-in">
            Sign In
          </Link>
        )}
        {name && (
          <div
            className="flex cursor-pointer"
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <img className="h-8 w-8" src={user_ava}></img>
            <h1 className="font-semibold mx-4 my-auto">{name}</h1>
            {dropdownOpen && (
              <div className="absolute mt-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    onClick={()=>{
                      localStorage.removeItem("fname");
                      localStorage.removeItem("email")
                      localStorage.removeItem('lname')
                      setName("");
                    }}
                    className="font-semibold block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    role="menuitem"
                  >
                    LogOut
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
