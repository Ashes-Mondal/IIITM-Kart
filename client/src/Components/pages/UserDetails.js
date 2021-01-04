import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../App";

function UserDetails({ user, setUser, setCart }) {
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
    if (result.response === false) {
      alert("Could not update!");
      setIsAuth(false);
      setCart([]);
      history.push("/login");
    }
  };

  const clearOrders = async () => {
    console.log("Clearing Orders...");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
      }),
    };
    const result = await (await fetch("/clearOrders", requestOptions)).json();
    console.log("response:", result.response);
    if (result.response) {
      setUser({
        ...user,
        orders: [],
      });
      console.log(user);
    }
  };

  const cancelOrder = async (orderId) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
      }),
    };
    const result = await (await fetch("/cancelOrder", requestOptions)).json();
    console.log("response:", result.response);
    if (result.response) {
      let ordersList = user.orders;
      ordersList = ordersList.filter((orderElement) => {
        if (orderElement._id !== orderId) return orderElement;
      });
      setUser({
        ...user,
        orders: ordersList,
      });
    }
  };
  return (
    <>
      <div className="product flex-container">
        <div className="flex-child1 shadow bg-white rounded">
          <h1>Your Orders</h1>
          <ul>
            {user.orders
              ? user.orders.map((element, index) => {
                  return (
                    <div key={index}>
                      <h3>
                        Order #{index + 1}
                        <button
                          onClick={() => cancelOrder(user.orders[index]._id)}
                          className="btn btn-warning ml-3"
                        >
                          Cancel Order
                        </button>
                      </h3>
                      <p>Date Of Order : {element.dateOfOrder.toString()}</p>
                      <p>Order ID: {element._id}</p>
                      {element.order.map((item, i) => {
                        return (
                          <li key={i}>
                            Item Name: {item.item.itemName}, Cost:{" "}
                            {item.item.cost} Qty:{item.Qty}
                          </li>
                        );
                      })}
                    </div>
                  );
                })
              : []}
          </ul>

          <button onClick={() => clearOrders()} className="btn btn-danger">
            Clear Order History
          </button>
        </div>
        <div className="flex-child2 shadow bg-white rounded sticky-top">
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
      </div>
    </>
  );
}

export default UserDetails;
