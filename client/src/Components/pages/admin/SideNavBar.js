import React from "react";
import { NavLink } from "react-router-dom";
const SideNavBar = () => {
  return (
    <div className="sidenav sticky-right">
      <br />
      <br />
      <NavLink to="/admin">DashBoard</NavLink>
      <NavLink to="/admin/users">Users</NavLink>
      <NavLink to="/admin/orders">Orders</NavLink>
      <NavLink to="/admin/items">Items</NavLink>
    </div>
  );
};

export default SideNavBar;
