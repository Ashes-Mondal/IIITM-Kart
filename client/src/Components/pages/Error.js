import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="text-center">
      <br />
      <h1>Error Page</h1>

      <div class="lead mt-5">
        Go to the <Link to="/login">Login</Link> Page.
      </div>
    </div>
  );
}

export default Error;
