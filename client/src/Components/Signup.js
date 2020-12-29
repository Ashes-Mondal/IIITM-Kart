import React, { useState, useContext } from "react";
import { User, Authentication } from "../App";
function Signup() {
  const [signup, setSignup] = useState({
    name: { firstName: "", lastName: "" },
    phone: "",
    email: "",
    password: "",
    Address: "",
  });
  const { user, setUser } = useContext(User);
  const { isAuth, setIsAuth } = useContext(Authentication);
  //handle Signup
  const handleSignup = () => {

  };

  return (
    <div>
      <form action="/signup" method="POST">
        <label htmlFor="mobile">FirstName</label>
        <input
          type="text"
          name="firstName"
          required
          value={signup.firstName}
          onChange={(e) => {
            setSignup({ ...signup, firstName: e.target.value });
          }}
        />
        <label htmlFor="mobile">LastName</label>
        <input
          type="text"
          name="lastName"
          required
          value={signup.lastName}
          onChange={(e) => {
            setSignup({ ...signup, lastName: e.target.value });
          }}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          required
          value={signup.email}
          onChange={(e) => {
            setSignup({ ...signup, email: e.target.value });
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          required
          value={signup.password}
          onChange={(e) => {
            setSignup({ ...signup, password: e.target.value });
          }}
        />
        <label htmlFor="mobile">Phone</label>
        <input
          type="text"
          name="phone"
          required
          value={signup.phone}
          onChange={(e) => {
            setSignup({ ...signup, phone: e.target.value });
          }}
        />
        <label htmlFor="Address">Address</label>
        <input
          type="text"
          name="Address"
          required
          value={signup.Address}
          onChange={(e) => {
            setSignup({ ...signup, Address: e.target.value });
          }}
        />

        <button>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
