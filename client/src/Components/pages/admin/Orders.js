import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";

const Orders = ({ setAdmin }) => {
  const history = useHistory();
  const { setIsAuth } = useContext(Authentication);
  const [orders, setOrders] = useState([]);
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


//  const handleCancel = async (order) =>{
//   const customerId = order.orderDetails.user._id;
//   const orderId = order._id;
//   //cancelling the order
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       customerId:customerId,
//       orderId:orderId
//     }),
//   };
//   const result = await (await fetch("/adminCancelOrder", requestOptions)).json();

//   if (result.response === true) {
//     setOrders(result.ordersData);
//   } else {
//     setOrders([]);
//     setIsAuth(false);
//     setAdmin(false);
//     history.push("/login");
//   }}

  return (
    <div className="adminPanel">
      <h1>Orders</h1>
      <main>
        {orders.map((order) => {
          return (
            <div className="container user-form">
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
                  <div>
                    <strong>First Name:</strong>
                    {order.orderDetails.user.name.firstName}
                  </div>
                  <div>
                    <strong>Last Name:</strong>
                    {order.orderDetails.user.name.lastName}
                  </div>
                  <div>
                    <strong>Phone:</strong>
                    {order.orderDetails.user.phone}
                  </div>
                  <div>
                    <strong style={{ textAlign: "center" }}>Email:</strong>
                    {order.orderDetails.user.email}
                  </div>
                  <div>
                    <strong>Address:</strong>
                    {order.orderDetails.user.address}
                  </div>
                </div>
                {/* PAYMENT DETAILS */}
                <div className="order-div">
                  <div style={{ textAlign: "center" }}>
                    <strong>Payment Details</strong>
                  </div>
                  <div>
                    <strong>Date Of Order:</strong>
                    {order.orderDetails.dateOfOrder}
                  </div>
                  <div>
                    <strong>Total Cost:</strong>
                    {order.orderDetails.totalCost}
                  </div>
                  <div>
                    <strong>razorpay PaymentId:</strong>
                    {order.orderDetails.razorpayPaymentId}
                  </div>
                  <div>
                    <strong>razorpay OrderId:</strong>
                    {order.orderDetails.razorpayOrderId}
                  </div>
                  <div>
                    <strong>razorpay Signature:</strong>
                    {order.orderDetails.razorpaySignature}
                  </div>
                </div>
                {/* ORDER */}
                <div className="order-div">
                <div style={{ textAlign: "center" }}>
                    <strong>Order Details</strong>
                  </div>
                  {order.orderDetails.order.map((itemDetails) => {
                    return (
                      <div className="order-item-div ">
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
              {/* <button onClick={()=>{handleCancel(order)}}>Cancel Order</button> */}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Orders;
