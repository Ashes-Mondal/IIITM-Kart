import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Login({ setLoaded }) {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //POSTING THE FORM
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password, phone: phone }),
    };
    const result = await (await fetch("/login", requestOptions)).json();
    if (result.response) {
      setLoaded(false);
      history.push("/");
      history.go();
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
      {error !== "" ? (
        <Alert variant="danger">
          <Alert.Heading>
            <h5 style={{ textAlign: "center" }}>{error}</h5>
          </Alert.Heading>
        </Alert>
      ) : null}

      <form className="box mt-5">
        <h1>Login</h1>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>LogIn</button>
        Not registered yet? <Link to="/signup">SignUp</Link>.
      </form>
    </div>
  );
}

export default Login;
