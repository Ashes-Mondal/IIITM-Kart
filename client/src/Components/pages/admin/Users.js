import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [users, setUsers] = useState([]);
  const [editWithPhone, setEditWithPhone] = useState("");
  useEffect(() => {
    const fetchAllUsers = async () => {
      const listOfUsers = await (await fetch("/fetchAllUsers")).json();
      console.log(listOfUsers);
      setUsers(listOfUsers.usersData);
    };
    fetchAllUsers();
  }, []);

  const toggleEdit = (phone) => {
    setEditWithPhone(phone);
  };
  const handleUpdate = () => {
    setEditWithPhone("");
  };

  return (
    <>
      <div>
        <h1>Users</h1>
        {/* links */}
        <div>
          <Link to="/admin">Main</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/orders">Orders</Link>
        </div>
        <main>
          {users.map((user) => {
            return (
              <div className="container user-form">
                {user.phone === editWithPhone ? (
                  <span onClick={handleUpdate}>UPDATE</span>
                ) : (
                  <span
                    onClick={() => {
                      toggleEdit(user.phone);
                    }}
                  >
                    EDIT
                  </span>
                )}
                <div>
                  <label>Id: </label>
                  <span>{user._id}</span>
                </div>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={user.name.firstName}
                    disabled={user.phone === editWithPhone ? false : true}
                  />
                  <input
                    type="text"
                    value={user.name.lastName}
                    disabled={user.phone === editWithPhone ? false : true}
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    value={user.phone}
                    disabled={user.phone === editWithPhone ? false : true}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="text"
                    value={user.email}
                    disabled={user.phone === editWithPhone ? false : true}
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    value={user.address}
                    disabled={user.phone === editWithPhone ? false : true}
                  />
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </>
  );
};

export default Orders;
