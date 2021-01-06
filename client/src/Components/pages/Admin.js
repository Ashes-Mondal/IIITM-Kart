import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const listOfUsers = await (await fetch("/fetchAllUsers")).json();
      console.log(listOfUsers);
      setUsers(listOfUsers);
    };
    fetchAllUsers();
  }, []);

  return (
    <div>
      <div class="sidenav">
        <a href="#">Dashboard</a>
        <a href="#">Orders</a>
        <a href="#">Users</a>
        <a href="#">Items</a>
      </div>
      <h1>ADMIN PAGE</h1>
    </div>
  );
};

export default Admin;
