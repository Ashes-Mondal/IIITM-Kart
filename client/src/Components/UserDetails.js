import React, { useContext} from "react";
// import { useParams } from "react-router-dom";
import {User} from "../App"

function UserDetails() {
  const {user} = useContext(User);
  console.log("user:",user)

  return (
    <div className="jumbotron container">
      <h1>User Details</h1>
      <br />
      <form className="userform">
        <div className="form-group">
          <h5>Personal Information</h5>
          <h6 style={{ color: "blue" }} onClick={() => {}}>
            Edit
          </h6>
          <input
            type="text"
            className="mr-2"
            value={user.name.firstName}
            name="FirstName"
            disabled
          />
          <input
            type="text"
            value={user.name.lastName}
            name="LastName"
            disabled
          />
        </div>
        <br />
        <div className="form-group">
          <h5>Email Address</h5>
          <h6 style={{ color: "blue" }} onClick={() => {}}>
            Edit
          </h6>
          <input type="text" value={user.email} name="Email" disabled />
        </div>
        <br />
        <div className="form-group">
          <h5>Mobile Number</h5>
          <h6 style={{ color: "blue" }} onClick={() => {}}>
            Edit
          </h6>
          <input type="text" value={user.phone} name="Phno" disabled />
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
