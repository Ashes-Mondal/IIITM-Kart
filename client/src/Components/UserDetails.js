import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState({
    Address: "",
    email: "",
    name: { firstName: "", lastName: "" },
    orders: [],
    password: "",
    phone: "",
    userCart: [{}],
    __v: 0,
    _id: "",
  });
  useEffect(() => {
    const fetchUserDetails = async () => {
      //POST request option
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),
      };
      //submitting on server side and changing the state
      const data = await (
        await fetch("/getUserDetails", requestOptions)
      ).json();
      console.log("UserData:", data);
      await setDetails(data);
    };
    fetchUserDetails();
  }, [id]);

  return (
    <div className="jumbotron container">
      <h1>User Details</h1>
      <br />
      <form className="userform">
        <div className="form-group">
          <h5>Personal Information</h5>
          <h6 style={{ color: "blue" }} onClick={() => {}}>
            Edit
          </h6>
          <input
            type="text"
            className="mr-2"
            value={details.name.firstName}
            name="FirstName"
            disabled
          />
          <input
            type="text"
            value={details.name.lastName}
            name="LastName"
            disabled
          />
        </div>
        <br />
        <div className="form-group">
          <h5>Email Address</h5>
          <h6 style={{ color: "blue" }} onClick={() => {}}>
            Edit
          </h6>
          <input type="text" value={details.email} name="Email" disabled />
        </div>
        <br />
        <div className="form-group">
          <h5>Mobile Number</h5>
          <h6 style={{ color: "blue" }} onClick={() => {}}>
            Edit
          </h6>
          <input type="text" value={details.phone} name="Phno" disabled />
        </div>
      </form>
    </div>
  );
}

export default UserDetails;
