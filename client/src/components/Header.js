import React from "react";

const Header = () => {
  return (
    <header>
      <div class="wrap header--flex">
        <h1 class="header--logo">
          <a href="/">Courses</a>
        </h1>
        <nav>
          <ul class="header--signedin">
            <li>Welcome, XXXX</li>
            <li>
              <a href="/">Sign Out</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
