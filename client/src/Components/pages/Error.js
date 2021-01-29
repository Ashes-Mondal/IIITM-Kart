import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authentication } from "../../App";

function Error() {
  const { isAuth } = useContext(Authentication);
  return (
    <div className="text-center">
      <br />
      <h1>Looking for something?</h1>
      <h6 className="mt-5">
        We're sorry. The Web address you entered is not a functioning page on
        our site.
      </h6>
      <div className="lead mt-3">
        Go to the{" "}
        {isAuth ? (
          <Link to="/">Home Page</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}{" "}
        Page.
      </div>
      <hr />
    </div>
  );
}

export default Error;
