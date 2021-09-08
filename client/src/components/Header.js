import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Header = () => {
  const { cookie } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookieExists] = useState(Object.keys(cookie).length);

  useEffect(() => {
    if (cookieExists) {
      setIsLoggedIn(true);
    }
  }, [cookieExists]);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {isLoggedIn ? (
            <ul className="header--signedin">
              <li>Welcome {cookie.authUser}!</li>
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
