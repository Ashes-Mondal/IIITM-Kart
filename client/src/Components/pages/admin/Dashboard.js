import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";

const Dashboard = ({ user, setAdmin }) => {
  const history = useHistory();
  const { setIsAuth } = useContext(Authentication);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

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
    const fetchAllUsers = async () => {
      const result = await (await fetch("/fetchAllUsers")).json();
      if (result.response === true) {
        setUsers(result.usersData);
      } else {
        setUsers([]);
        setIsAuth(false);
        setAdmin(false);
        history.push("/login");
      }
    };
    fetchAllUsers();
  }, [history, setIsAuth, setAdmin]);

  console.log("orders: ", orders);
  console.log("users; ", users);

  const pending = () => {
    var count = 0;
    orders.map((order) => {
      if (order.deliveryStatus === false) {
        count++;
      }
      return count;
    });
    return count;
  };
  const DeliveredOrders = () => {
    var count = 0;
    orders.map((order) => {
      if (order.deliveryStatus === true) {
        count++;
      }
      return count;
    });
    return count;
  };
  const cancelledOrders = () => {
    var count = 0;
    orders.map((order) => {
      if (order.cancelledStatus === true) {
        count++;
      }
      return count;
    });
    return count;
  };

  const status = (deliveryStatus, cancelledStatus) => {
    if (cancelledStatus) {
      return "Order Cancelled";
    }
    return deliveryStatus ? "Delivered" : "Order Pending";
  };
  return (
    <div className="adminPanel">
      <h1>Dashboard</h1>
      <div className="flex-container">
        {/* <img
          className="flex-childA1 shadow"
          src="data:image/png;base64,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"
          alt="ADMIN"
        /> */}
        <div className="flex-childA2 shadow rounded bg-info text-dark m-3">
          <h3>
            Welcome, {user.name.firstName} {user.name.lastName}
          </h3>
          <br />
          <h5>Admin ID: {user._id}</h5>
          <h5>Admin Email: {user.email}</h5>
        </div>
        <div className="flex-childA3 shadow rounded bg-success text-light m-3">
          <p>
            {users.length}{" "}
            <span>
              <img
                className="smallImage"
                src="https://www.pluribusnetworks.com/assets/icon-partners-registered.png"
              />
            </span>
          </p>
          <h5>Registered Users</h5>
        </div>
        <div className="flex-childA3 shadow rounded bg-info text-light m-3">
          <p>
            {DeliveredOrders()}{" "}
            <span>
              <img
                alt="Delivered order"
                className="smallImage"
                src="data:image/png;base64,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"
              />
            </span>
          </p>
          <h5>Delivered Orders</h5>
        </div>
        <div className="flex-childA3 shadow rounded bg-warning text-light m-3">
          <p>
            {pending()}
            <span>
              <img
                className="smallImage"
                src="https://cdn.onlinewebfonts.com/svg/img_110930.png"
              />
            </span>
          </p>
          <h5>Pending Orders</h5>
        </div>
        <div className="flex-childA3 shadow rounded bg-danger text-light m-3">
          <p>
            {cancelledOrders()}
            <span>
              <img
                className="smallImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQra5iNDCJPXhYHMtQ-G50fw7RyWU27ejwXQ&usqp=CAU"
              />
            </span>
          </p>
          <h5>Cancelled Orders</h5>
        </div>
      </div>
      <div className="flex-container">
        <div className="flex-childA3 shadow rounded bg-white">
          <p className="tc">Recent Orders</p>
          <table>
            <tr>
              <th>Order_ID</th>
              <th>User_Name</th>
              <th>Date/Time</th>
              <th>Delivery_Status</th>
            </tr>
            {orders
              .slice(-5)
              .reverse()
              .map((order, index) => {
                return (
                  <tr>
                    <td>
                      <h5>{order._id}</h5>
                    </td>
                    <td>
                      <h5>
                        {order.user.name.firstName} {order.user.name.lastName}
                      </h5>
                    </td>
                    <td>
                      <h5>{order.dateOfOrder.slice(0, 33)}</h5>
                    </td>
                    <td>
                      <h5>
                        {status(order.deliveryStatus, order.cancelledStatus)}
                      </h5>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// {orders
//   .reverse()
//   .slice(0, 5)
//   .map((order) => {
//     return (
//       <div>
//         <h6>
//           orderId:{" "}
//           <span>
//             {order._id} User: {order.user.name.firstName}{" "}
//             {order.user.name.lastName} Delivery_Status:{" "}
//             {status(order.deliveryStatus)}
//           </span>
//         </h6>
//       </div>
//     );
//   })}
