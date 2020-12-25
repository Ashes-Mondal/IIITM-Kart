import React from "react";
import SearchBox from "./SearchBox";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-bar navbar sticky-top">
      <div className="site-name">
        <span className="text1">IIITM-Kart</span>
        <span className="text2">A Shopping site for IIITM students</span>
      </div>
      <div className="search-box">
        <SearchBox />
      </div>
      <div className="navlink-container">
        <NavLink className ="navlink" activeClassName="active-nav-link" exact to="/">
          Home
        </NavLink>
        <NavLink className ="navlink" activeClassName="active-nav-link " exact  to="/cart">
          Cart
        </NavLink>
        <NavLink className ="navlink" activeClassName="active-nav-link" exact to="/user">
          User Details
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
