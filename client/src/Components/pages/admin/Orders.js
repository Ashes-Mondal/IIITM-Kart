import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";

const Orders = ({ setAdmin, setCart }) => {
  const history = useHistory();
  const { setIsAuth } = useContext(Authentication);
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const fetchAllOrders = async () => {
      const result = await (await fetch("/fetchAllOrders")).json();
      if (result.response === true) {
        setOrders(result.ordersData);
      } else {
        setOrders([]);
        setIsAuth(false);
        setAdmin(false);
        history.push("/login");
      }
    };
    fetchAllOrders();
  }, [history, setIsAuth, setAdmin]);

  const handleDeliveryStatus = async (order) => {
    const customerId = order.user._id;
    const orderId = order._id;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: customerId,
        orderId: orderId,
      }),
    };
    const result = await (
      await fetch("/adminChangeDeliveryStatus", requestOptions)
    ).json();
    if (result.response === false) {
      alert("Could not proceed further!");
      setIsAuth(false);
      setCart([]);
      history.push("/login");
    } else {
      let ordersData = orders.map((orderdetails) => {
        if (orderdetails._id === orderId)
          order.deliveryStatus = !order.deliveryStatus;
        return orderdetails;
      });
      setOrders(ordersData);
    }
  };

  return (
    <div className="adminPanel">
      <div className="row ml-5">
        <input
          type="button"
          className={
            filter === "all" ? "buttons3D buttons3D-selected" : "buttons3D"
          }
          onClick={() => {
            setFilter("all");
          }}
          value="All"
        />

        <input
          type="button"
          className={
            filter === "pending"
              ? "pending buttons3D buttons3D-selected"
              : "pending buttons3D"
          }
          onClick={() => {
            setFilter("pending");
          }}
          value="Pending"
        />

        <input
          type="button"
          className={
            filter === "delivered"
              ? "delivered buttons3D buttons3D-selected"
              : "delivered buttons3D"
          }
          onClick={() => {
            setFilter("delivered");
          }}
          value="Delivered"
        />

        <h1 className="ordersH1">Orders</h1>
      </div>
      <main>
        {orders.map((order, index) => {
          if (
            filter === "all" ||
            (order.deliveryStatus === true && filter === "delivered") ||
            (order.deliveryStatus === false && filter === "pending")
          )
            return (
              <div className=" box box-orders user-form" key={index}>
                {/* ORDER ID */}
                <div>
                  <strong>orderId:</strong>
                  <span>{order._id}</span>
                </div>
                {/* USER DETAILS */}
                <div className="order-div">
                  <div>
                    <div style={{ textAlign: "center" }}>
                      <strong>User Details</strong>
                    </div>
                    <div className="orderbox">
                      <div>
                        <strong>First Name:</strong>
                        {order.user.name.firstName}
                      </div>
                      <div>
                        <strong>Last Name:</strong>
                        {order.user.name.lastName}
                      </div>
                      <div>
                        <strong>Phone:</strong>
                        {order.user.phone}
                      </div>
                      <div>
                        <strong style={{ textAlign: "center" }}>Email:</strong>
                        {order.user.email}
                      </div>
                      <div>
                        <strong>Address:</strong>
                        {order.user.address}
                      </div>
                    </div>
                  </div>
                  {/* PAYMENT DETAILS */}
                  <div className="order-div">
                    <div style={{ textAlign: "center" }}>
                      <strong>Payment Details</strong>
                    </div>
                    <div className="orderbox">
                      <div>
                        <strong>Date Of Order:</strong>
                        {order.dateOfOrder}
                      </div>
                      <div>
                        <strong>Total Cost:</strong>
                        {order.totalCost}
                      </div>
                      <div>
                        <strong>razorpay PaymentId:</strong>
                        {order.razorpayPaymentId}
                      </div>
                      <div>
                        <strong>razorpay OrderId:</strong>
                        {order.razorpayOrderId}
                      </div>
                      <div>
                        <strong>razorpay Signature:</strong>
                        {order.razorpaySignature}
                      </div>
                    </div>
                  </div>
                  {/* ORDER */}
                  <div className="order-div">
                    <div style={{ textAlign: "center" }}>
                      <strong>Order Details</strong>
                    </div>
                    <div className="orderbox">
                      {order.order.map((itemDetails, index) => {
                        return (
                          <div className="order-item-div " key={index}>
                            <div>
                              <strong>Item Id:</strong>
                              {itemDetails.item._id}
                            </div>
                            <div>
                              <strong>Item Name:</strong>
                              {itemDetails.item.itemName}
                            </div>
                            <div>
                              <strong>Qty:</strong>
                              {itemDetails.Qty}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleDeliveryStatus(order);
                  }}
                >
                  <strong>
                    {order.deliveryStatus ? (
                      <span className="delivered">DELIVERED</span>
                    ) : (
                      <span className="pending">PENDING</span>
                    )}
                  </strong>
                </button>
              </div>
            );
          else return <></>;
        })}
      </main>
    </div>
  );
};

export default Orders;
