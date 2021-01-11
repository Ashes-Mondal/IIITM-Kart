import React, { useState, useContext, useEffect } from "react";
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
        orders: user.orders,
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

  const cancelOrder = async (orderId) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
      }),
    };
    const result = await (await fetch("/cancelOrder", requestOptions)).json();
    console.log("CO_response:", result.response);
    if (result.response) {
      let ordersList = user.orders;
      ordersList = ordersList.filter(
        (orderElement) => orderElement._id !== orderId
      );
      console.log("ordersList", ordersList);
      setUser({
        ...user,
        orders: ordersList,
      });
    } else {
      alert("Could not cancel order!");
      history.push("/login");
    }
  };

  return (
    <>
      <div className="product flex-container md-0 userbackground">
        <div className="flex-child1 container shadow ml-3 mt-1 md-0 bg-light rounded userbackground">
          <h1>Your Orders</h1>
          {user.orders !== undefined && user.orders.length > 0 ? (
            <div>
              {user.orders
                .slice(0)
                .reverse()
                .map((element, index) => {
                  return (
                    <div key={index} className="orderContainer">
                      <h3>
                        Order No. {index + 1}
                        <button
                          onClick={() =>
                            cancelOrder(
                              user.orders[user.orders.length - index - 1]._id
                            )
                          }
                          className="cancelOrderButton mr-5 float-right"
                        >
                          {user.orders[user.orders.length - index - 1]
                            .deliveryStatus == true
                            ? "Return Product"
                            : "Cancel Order"}
                        </button>
                      </h3>
                      <p>
                        <b>Date Of Order : </b>
                        {element.dateOfOrder
                          .toString()
                          .substring(
                            0,
                            element.dateOfOrder.toString().length - 30
                          )}
                      </p>
                      <p>
                        <b>Order ID : </b>
                        {element._id}
                      </p>
                      {element.order.map((item, i) => {
                        return (
                          <div
                            className="ordersList flex-container p-2"
                            key={i}
                          >
                            <div className="flex-child5">
                              <img
                                src={item.item.imageURL}
                                alt="item"
                                className="orderImgs"
                              />
                            </div>
                            <div className="flex-child6">
                              <b>{item.item.itemName}</b>, Cost :{" "}
                              {item.item.cost}, Qty : {item.Qty}
                              <br />
                              <span className="text-muted">
                                {item.item.description}
                              </span>
                              {/* {user.orders[user.orders.length - index - 1]
                                .deliveryStatus == true &&
                              user.orders[user.orders.length - index - 1].order[
                                i
                              ].rated == false ? (
                                <>
                                  <div class="slidecontainer">
                                    Give a rating: 1
                                    <input
                                      type="range"
                                      min={1}
                                      max={5}
                                      defaultValue={item.item.rating}
                                      class="slider"
                                      onChange={(e) => {
                                        let tempUser = user;
                                        tempUser.orders[
                                          tempUser.orders.length - index - 1
                                        ].order[i].item.rating = parseInt(
                                          e.target.value
                                        );
                                        setUser(tempUser);
                                      }}
                                    />
                                    5{" "}
                                    <button
                                      onClick={() => {
                                        let tempUser = user;
                                        tempUser.orders[
                                          tempUser.orders.length - index - 1
                                        ].order.rated = true;
                                        setUser(tempUser);
                                        updateUser();
                                      }}
                                    >
                                      Post rating
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )} */}
                            </div>
                          </div>
                        );
                      })}
                      <b>Total Cost:</b>
                      {user.orders[user.orders.length - index - 1].totalCost}
                      <p>
                        <b>Delivery Status : </b>
                        {user.orders[user.orders.length - index - 1]
                          .deliveryStatus == true ? (
                          <span className="delivered">Delivered.</span>
                        ) : (
                          <span className="pending">Pending...</span>
                        )}
                      </p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <img
                src="https://www.mageworx.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/6/26_extended_orders_grid.png"
                alt="Order list empty"
                className="mx-auto d-block"
              />
              <p className="text-center text-muted lead">
                Looks like your order list is empty.
              </p>
            </>
          )}
        </div>
        <div className="flex-child2 userdetails">
          <h1>User Details</h1>
          <br />
          <form className="userform">
            {editable ? (
              <h6
                className="edituser"
                onClick={() => {
                  setEditable(false);
                  updateUser();
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
      <div className="product flex-container m-0 userbackground">
        <div className="flex-child1 container shadow ml-3 mt-1 md-0 bg-light rounded userbackground">
          <h2>Contact Info</h2>
          <br />
          <br />
          <br />
          <h4>IIITMKart CEO: Ashes Mondal (7702942799) </h4>
          <h4>IIITMKart Accountant: Subodh Rajpopat (8600426191) </h4>
        </div>
        <div className="flex-child1 container shadow ml-3 mt-1 md-0 bg-light rounded userbackground">
          <h1>Follow us here</h1>
          <span>
            <img
              className="logo"
              src="https://thumbs.dreamstime.com/b/rounded-instagram-logo-web-print-transparent-white-background-use-printing-purpose-165758567.jpg"
              alt="insta"
            />
            <img
              className="logo"
              src="data:image/png;base64,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"
              alt="facebook"
            />
            <img
              className="logo"
              src="data:image/jpeg;base64,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"
              alt="insta"
            />
          </span>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
