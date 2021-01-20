import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../App";
import ReactStars from "react-rating-stars-component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserDetails({ user, setUser, setCart }) {
  const { setIsAuth } = useContext(Authentication);
  const history = useHistory();
  const [editable, setEditable] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);
  const [confirmDeleteUserModal, setConfirmDeleteUserModal] = useState(false);
  const [confirmCancelModal, setConfirmCancelModal] = useState(false);
  const [cancelOrderDetails, setCancelOrderDetails] = useState({
    _id: "",
    deliveryStatus: false,
  });
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    const re = /\d{10}/;
    return re.test(phone);
  }
  const updateUser = async () => {
    if (
      user.name.firstName === "" ||
      user.name.lastName === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.address === ""
    ) {
      alert("This field cannot be empty");
    } else if(!validateEmail(user.email)) {
      alert("Email not in valid format (example@example.com)");
    } else if(!validatePhone(user.phone)) {
      alert("phone not in valid format (10 digits)");
    }else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user.name.firstName,
          lastName: user.name.lastName,
          phone: user.phone,
          email: user.email,
          address: user.address,
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
      } else {
        //setEditable(false);
        window.location.reload();
      }
    }
  };

  const cancelOrder = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: cancelOrderDetails._id,
      }),
    };
    const result = await (await fetch("/cancelOrder", requestOptions)).json();
    console.log("result: ", result);
    console.log("CO_response:", result.response);
    if (result.response) {
      let ordersList = user.orders;
      ordersList = ordersList.filter(
        (orderElement) => orderElement._id !== cancelOrderDetails._id
      );
      console.log("ordersList is ", ordersList);
      console.log("cancel: ", user.orders.cancelledStatus);
      setUser({
        ...user,
        orders: ordersList,
      });
    } else {
      alert("Could not cancel order!");
      history.push("/login");
    }
  };

  const addRating = async (itemId, userRating) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: itemId,
        userRating: userRating,
      }),
    };
    const result = await (await fetch("/addRating", requestOptions)).json();
    if (result.response === false) {
      alert("Could not update!");
      setIsAuth(false);
      history.push("/login");
    }
  };

  const handleDeleteUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    const result = await (await fetch("/deleteUser", requestOptions)).json();
    if (result.response === false) {
      alert("Could not delete!");
      setIsAuth(false);
      history.push("/login");
    } else {
      history.push("/");
      history.go(0);
    }
  };

  const checkPendingOrders = () => {
    for (let i = 0; i < user.orders.length; i++) {
      if (user.orders[i].deliveryStatus === false) return true;
    }
    return false;
  };
  return (
    <>
      {/* CONFIRM CANCEL/RETURN PRODUCT*/}
      <Modal
        show={confirmCancelModal}
        onHide={() => setConfirmCancelModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to
          {cancelOrderDetails.deliveryStatus ? " Return" : " Cancel"} your
          order?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setConfirmCancelModal(false);
              cancelOrder();
              setCancelOrderDetails({ id: "", deliveryStatus: false });
            }}
          >
            Yes
          </Button>
          <Button
            variant="primary"
            onClick={() => setConfirmCancelModal(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* CONFIRM Delete USER */}
      <Modal
        show={confirmDeleteUserModal}
        onHide={() => setConfirmDeleteUserModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setConfirmDeleteUserModal(false);
              handleDeleteUser();
            }}
          >
            Yes
          </Button>
          <Button
            variant="primary"
            onClick={() => setConfirmDeleteUserModal(false)}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Show could not delete modal */}
      <Modal show={deleteModal} onHide={() => showDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Could not Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>You got pending orders</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => showDeleteModal(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
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
                          onClick={() => {
                            setCancelOrderDetails(
                              user.orders[user.orders.length - index - 1]
                            );
                            setConfirmCancelModal(true);
                          }}
                          className="cancelOrderButton mr-5 float-right"
                        >
                          {user.orders[user.orders.length - index - 1]
                            .deliveryStatus === true
                            ? "Return Product"
                            : "Cancel Order"}
                        </button>
                      </h3>
                      <p>
                        <b>Date Of Order : </b>
                        {element.dateOfOrder}
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
                              {user.orders[user.orders.length - index - 1]
                                .deliveryStatus === true &&
                              user.orders[user.orders.length - index - 1].order[
                                i
                              ].rated !== true ? (
                                <>
                                  <div className="flex-container p-0">
                                    <div className="giveRating">
                                      Give a rating:
                                    </div>
                                    <div className="reactStars">
                                      <ReactStars
                                        count={5}
                                        onChange={(newValue) => {
                                          let tempUser = user;
                                          tempUser.orders[
                                            tempUser.orders.length - index - 1
                                          ].order[i].userRating = newValue;
                                          setUser(tempUser);
                                        }}
                                        size={24}
                                        activeColor="#ffd700"
                                      />
                                    </div>
                                    <div>
                                      <button
                                        className="postRating"
                                        onClick={() => {
                                          if (
                                            user.orders[
                                              user.orders.length - index - 1
                                            ].order[i].userRating
                                          ) {
                                            let tempUser = user;
                                            tempUser.orders[
                                              tempUser.orders.length - index - 1
                                            ].order[i].rated = true;
                                            setUser(tempUser);
                                            updateUser();
                                            addRating(
                                              user.orders[
                                                user.orders.length - index - 1
                                              ].order[i].item._id,
                                              user.orders[
                                                user.orders.length - index - 1
                                              ].order[i].userRating
                                            );
                                            setEditable(!editable);
                                            setEditable(!editable);
                                          } else {
                                            alert("select a rating first");
                                          }
                                        }}
                                      >
                                        Post Rating
                                      </button>
                                    </div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                      <b>Total Cost:</b>
                      {user.orders[user.orders.length - index - 1].totalCost}
                      <p>
                        <b>Delivery Status : </b>
                        {user.orders[user.orders.length - index - 1]
                          .deliveryStatus === true ? (
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
        <div className="flex-child2">
          <div className="userdetails">
            <h1>User Details</h1>
            <br />
            <form className="userform">
              {editable ? (
                <h6
                  className="edituser"
                  onClick={() => {
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
                <div className="d-flex">
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
              <div className="form-group">
                <h5>Default Address</h5>

                <input
                  type="text"
                  value={user.address || ""}
                  name="Address"
                  disabled={editable ? "" : "disabled"}
                  onChange={(e) => {
                    setUser({ ...user, address: e.target.value });
                  }}
                />
              </div>
            </form>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (checkPendingOrders()) {
                  showDeleteModal(true);
                } else setConfirmDeleteUserModal(true);
              }}
            >
              Delete User
            </button>
          </div>
          <br />
          <div className="userdetails">
            <h2>Feel free to Contact us</h2>
            <br />
            <h4>
              <a href="mailto:iiitmkart.help@gmail.com">Contact</a>{" "}
            </h4>
            <h4>
              <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp7ZXBSOy1Me1C3rmHDZRHIl1o7T6y_P5D-A&usqp=CAU">
                About us
              </a>{" "}
            </h4>
            <br />
            <h2>Follow us here</h2>
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
                src="https://cdn3.iconfinder.com/data/icons/basicolor-reading-writing/24/077_twitter-512.png"
                alt="twitter"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
