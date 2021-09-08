import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Header = () => {
  const { authUser } = useContext(Context);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authUser ? (
            <ul className="header--signedin">
              <li>Welcome {authUser}!</li>
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          ) : (
            <ul className="header--signedin">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
