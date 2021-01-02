import React, { useState } from "react";

function Login() {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="login-form">
      <form action="/login" method="POST">
        {/*box shadow-lg mt-5*/}
        <h1>Login</h1>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button>LogIn</button>
      </form>
    </div>
  );
}

export default Login;
