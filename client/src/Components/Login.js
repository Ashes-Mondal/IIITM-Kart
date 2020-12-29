import React, { useState, useContext } from "react";
import { User, Authentication } from "../App";

function Login() {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const { user, setUser } = useContext(User);
  const { isAuth, setIsAuth } = useContext(Authentication);

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log("phone", phone);
    console.log("password", password);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phone, password: password }),
    };
    //submitting on server side and changing the state
    const response = await (await fetch("/login", requestOptions)).json();
    console.log("response:",response);
  }

  return (
    <div>
      <form action="/login" method="POST">
        {/*onSubmit={handleLogin}*/ }
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
          type="text"
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
