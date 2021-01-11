import React ,{useContext}from "react";
import { Link } from "react-router-dom";
import {Authentication} from "../../App"

function Error() {
  const {isAuth} = useContext(Authentication)
  return (
    <div className="text-center">
      <br />
      <h1>Error Page</h1>

      <div className="lead mt-5">
        Go to the {isAuth?<Link to="/">Home Page</Link>:<Link to="/login">Login</Link>} Page.
      </div>
    </div>
  );
}

export default Error;
