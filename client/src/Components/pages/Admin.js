import React, { useEffect, useState } from "react";

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
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      <h1>ADMIN PAGE</h1>
    </div>
  );
};

export default Admin;
