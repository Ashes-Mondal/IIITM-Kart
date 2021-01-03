import React, { useState,useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../App";

function UserDetails({ user, setUser ,setCart}) {
  const { setIsAuth } = useContext(Authentication);
  const history = useHistory();
  const [editable, setEditable] = useState(false);


  const updateUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        phone: user.phone,
        email: user.email,
      }),
    };
    const result = await (
      await fetch("/editUserDetails", requestOptions)
    ).json();
    if(result.response === false){
      alert("Could not update!");
      setIsAuth(false);
      setCart([]);
      history.push("/login");
    }
  };
  return (
    <>
      <div className="jumbotron container">
        <h1>User Details</h1>
        <br />
        <form className="userform">
          {editable ? (
            <h6
              className="edituser"
              onClick={() => {
                setEditable(false);
                updateUser(user);
              }}
            >
              Update
            </h6>
          ) : (
            <h6
              className="edituser"
              onClick={() => {
                setEditable(true);
              }}
            >
              Edit
            </h6>
          )}

          <div className="form-group">
            <h5>Personal Information</h5>
            <input
              type="text"
              className="mr-2"
              value={user.name.firstName || ""}
              name="FirstName"
              disabled={editable ? "" : "disabled"}
              onChange={(e) => {
                setUser({
                  ...user,
                  name: {
                    firstName: e.target.value,
                    lastName: user.name.lastName,
                  },
                });
              }}
            />
            <input
              type="text"
              value={user.name.lastName || ""}
              name="LastName"
              disabled={editable ? "" : "disabled"}
              onChange={(e) => {
                setUser({
                  ...user,
                  name: {
                    firstName: user.name.firstName,
                    lastName: e.target.value,
                  },
                });
              }}
            />
          </div>
          <br />
          <div className="form-group">
            <h5>Email address</h5>

            <input
              type="text"
              value={user.email || ""}
              name="Email"
              disabled={editable ? "" : "disabled"}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <br />
          <div className="form-group">
            <h5>Mobile Number</h5>

            <input
              type="text"
              value={user.phone || ""}
              name="Phno"
              disabled={editable ? "" : "disabled"}
              onChange={(e) => {
                setUser({ ...user, phone: e.target.value });
              }}
            />
          </div>
        </form>
        <form action="/deleteUser" method="POST">
          <button className="btn btn-danger">Delete User</button>
        </form>
      </div>
      <div className="jumbotron container text-left">
        <h1>Your Orders</h1>
        <ul>
          {user.orders
            ? user.orders.map((element, index) => {
                return (
                  <>
                    <h3>Order #{index}</h3>
                    <p>
                      Date Of Order : {element.dateOfOrder.toLocaleString()}
                    </p>
                    {element.order.map((item) => {
                      return (
                        <>
                          <li>
                            Item Name: {item.item.itemName}, Cost:{" "}
                            {item.item.cost} Qty:{item.Qty}
                          </li>
                        </>
                      );
                    })}
                  </>
                );
              })
            : []}
        </ul>
      </div>
    </>
  );
}

export default UserDetails;
