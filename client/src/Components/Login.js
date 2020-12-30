import React, { useState } from "react";

function Login() {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form action="/login" method="POST">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>LogIn</button>
      </form>
    </div>
  );
}

export default Login;
