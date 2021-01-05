import React from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    //   links
    <div>
      <Link to="/admin">Main</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/orders">Orders</Link>
    </div>
  );
};

export default Orders;
