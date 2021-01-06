import React from "react";
import { Link } from "react-router-dom";
const SideNavBar = () => {
  return (
    <div className="sidenav">
      <Link to="/admin">DashBoard</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/items">Items</Link>
    </div>
  );
};

export default SideNavBar;
