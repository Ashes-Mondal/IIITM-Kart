import React, { useContext, useState } from "react";
// import { User } from "../../App";

function UserDetails({ user, setUser }) {
  // const { user } = useContext(User);
  // console.log("user:", user);
  const [editable, setEditable] = useState(false);
  // const [userInfo, setUserInfo] = useState(user);
  console.log("userInfo:", user);
  return (
    <div className="jumbotron container">
      <h1>User Details</h1>
      <br />
      <form className="userform">
        {editable ? (
          <h6
            className="edituser"
            onClick={() => {
              setEditable(false);
            }}
          >
            Update
          </h6>
        ) : (
          <h6
            className="edituser"
            onClick={() => {
              setEditable(true);
            }}
          >
            Edit
          </h6>
        )}

        <div className="form-group">
          <h5>Personal Information</h5>
          <input
            type="text"
            className="mr-2"
            value={user.name.firstName || ""}
            name="FirstName"
            disabled={editable ? "" : "disabled"}
            onChange={(e) => {
              setUser({
                ...user,
                name: {
                  firstName: e.target.value,
                  lastName: user.name.lastName,
                },
              });
            }}
          />
          <input
            type="text"
            value={user.name.lastName || ""}
            name="LastName"
            disabled={editable ? "" : "disabled"}
            onChange={(e) => {
              setUser({
                ...user,
                name: {
                  firstName: user.name.firstName,
                  lastName: e.target.value,
                },
              });
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <h5>Email address</h5>

          <input
            type="text"
            value={user.email || ""}
            name="Email"
            disabled={editable ? "" : "disabled"}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </div>
        <br />
        <div className="form-group">
          <h5>Mobile Number</h5>

          <input
            type="text"
            value={user.phone || ""}
            name="Phno"
            disabled={editable ? "" : "disabled"}
            onChange={(e) => {
              setUser({ ...user, phone: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
