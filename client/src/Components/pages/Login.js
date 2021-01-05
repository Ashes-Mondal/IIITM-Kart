import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      {/*className="login-form"*/}
      <form className="box mt-5" action="/login" method="POST">
        {/*box shadow-lg mt-5*/}
        <h1>Login</h1>
        {/* <label htmlFor="phone">Phone</label> */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        {/* <label htmlFor="password">Password</label> */}
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>LogIn</button>
        Not registered yet? <Link to="/signup">SignUp</Link>.
      </form>
    </div>
  );
}

export default Login;
