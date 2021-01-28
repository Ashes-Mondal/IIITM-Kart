import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  tableOrder: {
    position: "relative",
    margin: 0,
    width: "100vw",
  },
  paper: {
    margin: 0,
    marginLeft: 0,
  },
}));

const Dashboard = ({ user, setAdmin }) => {
  const classes = useStyles();
  const [showProcessing, setShowProcessing] = useState(true);
  const history = useHistory();
  const { setIsAuth } = useContext(Authentication);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      const result = await (await fetch("/fetchAllOrders")).json();
      if (result.response === true) {
        setOrders(result.ordersData);
        setShowProcessing(false);
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

  // console.log("orders: ", orders);
  // console.log("users; ", users);

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
    if (cancelledStatus && deliveryStatus) return "Order Returned";
    if (cancelledStatus) return "Order Cancelled";
    return deliveryStatus ? "Delivered" : "Order Pending";
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  //   &nbsp
  return (
    <div className="adminPanel">
      <h1>Dashboard</h1>
      <div className="grid-containerA1">
        <div className="flex-childA2 shadow rounded bg-info text-dark m-3">
          <h3>
            Welcome, {user.name.firstName} {user.name.lastName}
          </h3>
          <br />
          <h5>Admin ID: {user._id}</h5>
          <h5>Admin Email: {user.email}</h5>
        </div>
        <div
          className="flex-childA3 shadow rounded bg-success text-light m-3"
          onClick={() => {
            history.push("/admin/users");
          }}
        >
          <p>
            {users.length}
            <span>
              <img
                alt="Registered user"
                className="smallImage"
                src="https://www.pluribusnetworks.com/assets/icon-partners-registered.png"
              />
            </span>
          </p>
          <h5>Registered Users</h5>
        </div>
        <div
          className="flex-childA3 shadow rounded bg-info text-light m-3"
          onClick={() => {
            history.push("/admin/orders");
          }}
        >
          <p>
            {DeliveredOrders()}
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
        <div
          className="flex-childA3 shadow rounded bg-warning text-light m-3"
          onClick={() => {
            history.push("/admin/orders");
          }}
        >
          <p>
            {pending()}
            <span>
              <img
                alt="prnding order"
                className="smallImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AC_5-RQE1INXzoNP09Vr3A5DtYJiEb_zQA&usqp=CAU"
              />
            </span>
          </p>
          <h5>Pending Orders</h5>
        </div>
        <div
          className="flex-childA3 shadow rounded bg-danger text-light m-3"
          onClick={() => {
            history.push("/admin/orders");
          }}
        >
          <p>
            {cancelledOrders()}
            <span>
              <img
                alt="Orders Lost"
                className="smallImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQra5iNDCJPXhYHMtQ-G50fw7RyWU27ejwXQ&usqp=CAU"
              />
            </span>
          </p>
          <h5>Orders Lost</h5>
        </div>
      </div>
      <>
        <a
          href="/admin/orders"
          style={{ textDecoration: "none", color: "black" }}
        >
          {showProcessing ? <LinearProgress color="secondary" /> : null}
          <h1>Recent Orders</h1>

          <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.tableOrder} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ fontSize: "1rem" }}>
                    Order Id
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                    Customer Name
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                    Total Amount
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                    Contact Number
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                    Order Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(-5)
                  .reverse()
                  .map((order, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {order.razorpayOrderId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.user.name.firstName} {order.user.name.lastName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Rs {order.totalCost}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.user.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {status(order.deliveryStatus, order.cancelledStatus)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </a>
      </>
    </div>
  );
};

export default Dashboard;
