import React from "react";
import {  Link } from "react-router-dom";


const Dashboard = () => {

  return (
    <>
      <Link to="/admin">Main</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/orders">Orders</Link>
    </>
  );
};

export default Dashboard;
