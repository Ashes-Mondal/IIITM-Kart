import React from "react";
const firstName = "John",
  lastName = "Doe",
  email = "JohnDoe@gmail.com",
  phno = "9999888877";

function UserDetails() {
  return (
    <div class="jumbotron container">
      <h1>User Details</h1>
      <br />
      <form class="userform">
        <h5 className="edituser" onClick={() => {}}>
          Edit
        </h5>
        <div class="form-group">
          <h5>Personal Information</h5>

          <input
            type="text"
            class="mr-2"
            value={firstName}
            name="FirstName"
            disabled
          />
          <input type="text" value={lastName} name="LastName" disabled />
        </div>
        <br />
        <div class="form-group">
          <h5>Email Address</h5>
          <input type="text" value={email} name="Email" disabled />
        </div>
        <br />
        <div class="form-group">
          <h5>Mobile Number</h5>
          <input type="text" value={phno} name="Phno" disabled />
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
