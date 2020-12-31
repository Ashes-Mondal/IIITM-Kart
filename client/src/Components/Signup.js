import React, { useState } from "react";
function Signup() {
  const [signup, setSignup] = useState({
    name: { firstName: "", lastName: "" },
    phone: "",
    email: "",
    password: "",
    Address: "",
  });

  return (
    <div>
      <form
        className="box box-signup shadow-lg mt-5"
        action="/signup"
        method="POST"
      >
        <h1>Sign Up</h1>
        {/* <label htmlFor="mobile">FirstName</label> */}
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={signup.firstName}
              onChange={(e) => {
                setSignup({ ...signup, firstName: e.target.value });
              }}
            />
          </div>
          {/* <label htmlFor="mobile">LastName</label> */}
          <div className="col-6">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={signup.lastName}
              onChange={(e) => {
                setSignup({ ...signup, lastName: e.target.value });
              }}
            />
          </div>
        </div>
        {/* <label htmlFor="email">Email</label> */}
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              value={signup.email}
              onChange={(e) => {
                setSignup({ ...signup, email: e.target.value });
              }}
            />
          </div>
          {/* <label htmlFor="password">Password</label> */}
          <div className="col-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={signup.password}
              onChange={(e) => {
                setSignup({ ...signup, password: e.target.value });
              }}
            />
          </div>
        </div>
        {/* <label htmlFor="mobile">Phone</label> */}
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              value={signup.phone}
              onChange={(e) => {
                setSignup({ ...signup, phone: e.target.value });
              }}
            />
          </div>
          {/* <label htmlFor="Address">Address</label> */}
          <div className="col-6">
            <input
              type="text"
              name="Address"
              placeholder="Address"
              required
              value={signup.Address}
              onChange={(e) => {
                setSignup({ ...signup, Address: e.target.value });
              }}
            />
          </div>
        </div>
        <button>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
