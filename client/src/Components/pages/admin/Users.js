import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    //   links
    <div>
      <Link to="/admin">Main</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/orders">Orders</Link>
    </div>
  );
};

export default Users;
