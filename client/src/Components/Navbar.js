import React from "react";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="heading">
        <div className="navlinks">
          <ul>
            <li>
              <span className="text1">IIITM-Kart</span>
              <span className="text2">A Shopping site for IIITM students</span>
            </li>
            <li>
              <SearchBox />
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/user">User Details</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
