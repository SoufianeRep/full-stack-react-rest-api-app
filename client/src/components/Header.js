import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Header = () => {
  const { authorizedUser } = useContext(Context);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {authorizedUser ? (
            <>
              <ul className="header--signedin">
                <li>Welcome {authorizedUser}!</li>
                <li>
                  <Link to="/signout">Sign Out</Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="header--signedin">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/signin">Sign In</Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
