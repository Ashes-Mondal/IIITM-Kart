import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";

const Users = ({ setCart, setAdmin }) => {
  const history = useHistory();
  const { setIsAuth } = useContext(Authentication);
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({
    _id: "",
    name: { firstName: "", lastName: "" },
    email: "",
    phone: "",
    address: "",
  });
  const [edit, setEdit] = useState("");
  useEffect(() => {
    const fetchAllUsers = async () => {
      const result = await (await fetch("/fetchAllUsers")).json();
      if (result.response === true) {
        setUsers(result.usersData);
      } else {
        setUsers([]);
        setUserDetails({
          _id: "",
          name: { firstName: "", lastName: "" },
          email: "",
          phone: "",
          address: "",
        });
        setIsAuth(false);
        setAdmin(false);
        history.push("/login");
      }
    };
    fetchAllUsers();
  }, [history, setIsAuth, setAdmin]);

  const toggleEdit = (user) => {
    setEdit(user.phone);
    setUserDetails(user);
  };
  const handleUpdate = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userDetails._id,
        firstName: userDetails.name.firstName,
        lastName: userDetails.name.lastName,
        phone: userDetails.phone,
        email: userDetails.email,
        address: userDetails.address,
      }),
    };
    const result = await (
      await fetch("/adminEditUserDetails", requestOptions)
    ).json();
    if (result.response === false) {
      alert("Could not update!");
      setIsAuth(false);
      setCart([]);
      history.push("/login");
    }
    //finally resetting to normal
    setUsers(
      users.map((user) => {
        if (edit === user.phone) {
          return userDetails;
        }
        return user;
      })
    );
    setEdit("");
  };

  return (
    <>
      <div className="adminPanel">
        <h1>Users</h1>
        <main>
          {users.map((user) => {
            return (
              <div className="container user-form">
                {user.phone === edit ? (
                  <span onClick={handleUpdate}>UPDATE</span>
                ) : (
                  <span
                    onClick={() => {
                      toggleEdit(user);
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
                    value={
                      user.phone === edit
                        ? userDetails.name.firstName
                        : user.name.firstName
                    }
                    onChange={(e) => {
                      let changedUserDetails = {
                        ...userDetails,
                        name: {
                          ...userDetails.name,
                          firstName: e.target.value,
                        },
                      };
                      setUserDetails(changedUserDetails);
                    }}
                    disabled={user.phone === edit ? false : true}
                  />
                  <input
                    type="text"
                    value={
                      user.phone === edit
                        ? userDetails.name.lastName
                        : user.name.lastName
                    }
                    onChange={(e) => {
                      let changedUserDetails = {
                        ...userDetails,
                        name: { ...userDetails.name, lastName: e.target.value },
                      };
                      setUserDetails(changedUserDetails);
                    }}
                    disabled={user.phone === edit ? false : true}
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    value={user.phone === edit ? userDetails.phone : user.phone}
                    onChange={(e) => {
                      let changedUserDetails = {
                        ...userDetails,
                        phone: e.target.value,
                      };
                      setUserDetails(changedUserDetails);
                    }}
                    disabled={user.phone === edit ? false : true}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="text"
                    value={user.phone === edit ? userDetails.email : user.email}
                    onChange={(e) => {
                      let changedUserDetails = {
                        ...userDetails,
                        email: e.target.value,
                      };
                      setUserDetails(changedUserDetails);
                    }}
                    disabled={user.phone === edit ? false : true}
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    value={
                      user.phone === edit ? userDetails.address : user.address
                    }
                    onChange={(e) => {
                      let changedUserDetails = {
                        ...userDetails,
                        address: e.target.value,
                      };
                      setUserDetails(changedUserDetails);
                    }}
                    disabled={user.phone === edit ? false : true}
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

export default Users;
