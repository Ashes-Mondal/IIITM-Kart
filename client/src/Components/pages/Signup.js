import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Signup({setLoaded}) {
  const history = useHistory();
  const [signup, setSignup] = useState({
    firstName: "", 
    lastName: "" ,
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");


const handleSignUp = async(e)=>{
  e.preventDefault();
    //POSTING THE FORM
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        password: signup.password, 
        firstName: signup.firstName,
        lastName: signup.lastName,
        address: signup.address,
        phone: signup.phone,
        email: signup.email
      }),
    };
    const result = await (await fetch("/signup", requestOptions)).json();
    if (result.response) {
      setLoaded(false);
      history.push("/login");
      history.go();
    } else {
      console.log ("SUP_result",result)
      setError(result.error._message);
    }
}
  return (
    <div>
      {error !== "" ? (
        <Alert variant="danger">
          <Alert.Heading>
            <h5 style={{ textAlign: "center" }}>{error}</h5>
          </Alert.Heading>
        </Alert>
      ) : null}
      <form className="box box-signup mt-5">
        <h1>Sign Up</h1>
        <div className="row field">
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
            <label className="signupLabel" htmlFor="mobile">
              First Name
            </label>
          </div>

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
            <label className="signupLabel" htmlFor="mobile">
              Last Name
            </label>
          </div>
        </div>
        <div className="row field">
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
            <label className="signupLabel" htmlFor="email">
              Email
            </label>
          </div>

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
            <label className="signupLabel" htmlFor="password">
              Password
            </label>
          </div>
        </div>
        <div className="row field">
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
            <label className="signupLabel" htmlFor="mobile">
              Phone
            </label>
          </div>

          <div className="col-6">
            <input
              type="text"
              name="address"
              placeholder="address"
              required
              value={signup.address}
              onChange={(e) => {
                setSignup({ ...signup, address: e.target.value });
              }}
            />
            <label className="signupLabel" htmlFor="address">
              address
            </label>
          </div>
        </div>
        <button onClick={handleSignUp}>Signup</button>
        Already registered? <Link to="/login">Login</Link>.
      </form>
    </div>
  );
}

export default Signup;
