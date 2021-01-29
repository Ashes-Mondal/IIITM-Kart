import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../App";
import ReactStars from "react-rating-stars-component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LinearProgress from "@material-ui/core/LinearProgress";
import ScrollTop from "./ScrollTop";

function UserDetails({ user, setUser, setCart, setLoaded }) {
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
  const [showProcessing, setShowProcessing] = useState(false);
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
    } else if (!validateEmail(user.email)) {
      alert("Email not in valid format (example@example.com)");
    } else if (!validatePhone(user.phone)) {
      alert("phone not in valid format (10 digits)");
    } else {
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
    if (result.response) {
      let ordersList = user.orders;
      ordersList = ordersList.filter(
        (orderElement) => orderElement._id !== cancelOrderDetails._id
      );
      setUser({
        ...user,
        orders: ordersList,
      });
      setShowProcessing(false);
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
      setLoaded(false);
      history.push("/");
      history.go();
    }
  };

  const checkPendingOrders = () => {
    for (let i = 0; i < user.orders.length; i++) {
      if (user.orders[i].deliveryStatus === false) return true;
    }
    return false;
  };
  return (
    <div style={{paddingBottom:"12rem"}}>
      <ScrollTop showBelow={400}/>
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
              setShowProcessing(true);
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
      {showProcessing ? <LinearProgress color="secondary" /> : null}
      <div className="gridContainer userbackground">
        <div>
          <div className="userdetails userbackground">
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
              <h5>Personal Information</h5>
              <div className="form-group">
                <input
                  type="text"
                  className={editable ? "mr-5" : "mr-5 disabled"}
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
                  className={editable ? "" : "disabled"}
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
                  className={editable ? "" : "disabled"}
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
                  className={editable ? "" : "disabled"}
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
                  className={editable ? "" : "disabled"}
                  name="Address"
                  disabled={editable ? "" : "disabled"}
                  onChange={(e) => {
                    setUser({ ...user, address: e.target.value });
                  }}
                />
              </div>
            </form>
            <button
              className="deleteUser"
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
        </div>
        <div>
          <h1 className="mt-3">Your Orders</h1>
          {user.orders !== undefined && user.orders.length > 0 ? (
            <div>
              {user.orders
                .slice(0)
                .reverse()
                .map((element, index) => {
                  return (
                    <div key={index} className="orderContainer">
                      <b>Order ID.</b> {element.razorpayOrderId}
                      <p>
                        <b>Date Of Order : </b>
                        {element.dateOfOrder.slice(0, 25)}
                      </p>
                      <hr />
                      {element.order.map((item, i) => {
                        return (
                          <div key={i}>
                            <div className="ordersList row p-2">
                              <div className="col-3">
                                <img
                                  src={item.item.imageURL}
                                  alt="item"
                                  className="orderImgs"
                                />
                              </div>
                              <div className="col-md-auto child6">
                                <b>{item.item.itemName}</b>, Cost :{" Rs "}
                                {item.item.cost}, Qty : {item.Qty}
                                <br />
                                <span className="text-muted">
                                  {item.item.description}
                                </span>
                                {user.orders[user.orders.length - index - 1]
                                  .deliveryStatus === true &&
                                user.orders[user.orders.length - index - 1]
                                  .order[i].rated !== true ? (
                                  <>
                                    <div className="row">
                                      <div className="giveRating ml-3">
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
                                          size={20}
                                          activeColor="#ffd700"
                                        />
                                      </div>
                                      <div>
                                        <button
                                          className="postRating "
                                          onClick={() => {
                                            if (
                                              user.orders[
                                                user.orders.length - index - 1
                                              ].order[i].userRating
                                            ) {
                                              let tempUser = user;
                                              tempUser.orders[
                                                tempUser.orders.length -
                                                  index -
                                                  1
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
                            <hr />
                          </div>
                        );
                      })}
                      <b>Total Cost: Rs </b>
                      {user.orders[user.orders.length - index - 1].totalCost}
                      <p className="row align-items-center">
                        <b>Delivery Status : </b>
                        {user.orders[user.orders.length - index - 1]
                          .deliveryStatus === true ? (
                          <span className="delivered">Delivered.</span>
                        ) : (
                          <span className="pending">Pending...</span>
                        )}
                        <button
                          style={{
                            marginLeft: "auto",
                            height: "3rem",
                            border: "2px solid indianred",
                          }}
                          disabled={showProcessing}
                          onClick={() => {
                            setCancelOrderDetails(
                              user.orders[user.orders.length - index - 1]
                            );
                            setConfirmCancelModal(true);
                          }}
                          className="cancelOrderButton"
                        >
                          {user.orders[user.orders.length - index - 1]
                            .deliveryStatus === true
                            ? "Return Product"
                            : "Cancel Order"}
                        </button>
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
      </div>
    </div>
  );
}

export default UserDetails;
