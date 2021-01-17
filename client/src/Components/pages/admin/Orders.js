import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	table: {
		minWidth: 650,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const OrderDetails = ({ orderDetails, showMore, setShowMore }) => {
	const classes = useStyles();
	const handleClose = () => {
		setShowMore(false);
	};
	return (
		<div>
			<Dialog
				fullScreen
				open={showMore}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Order Id: {orderDetails._id}
						</Typography>
					</Toolbar>
				</AppBar>
				<List>
					<h4>
						<strong>User Details</strong>
					</h4>
					<ListItem>
						<ListItemText
							primary="User Id:"
							secondary={orderDetails.user._id}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Customer Name:"
							secondary={`${orderDetails.user.name.firstName} ${orderDetails.user.name.lastName}`}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Phone:"
							secondary={orderDetails.user.phone}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Email:"
							secondary={orderDetails.user.email}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Address"
							secondary={orderDetails.user.address}
						/>
					</ListItem>
				</List>
				<Divider />
				<List>
					<h4>
						<strong>Items ordered</strong>
					</h4>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">Item Name</TableCell>
									<TableCell align="center">Item ID</TableCell>
									<TableCell align="center">Cost</TableCell>
									<TableCell align="center">Qty</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orderDetails.order.map((item, index) => (
									<TableRow key={index}>
										<TableCell scope="row" align="center">
											{item.item.itemName}
										</TableCell>
										<TableCell align="center">{item.item._id}</TableCell>
										<TableCell align="center">{`Rs ${item.item.cost}`}</TableCell>
										<TableCell align="center">{item.Qty}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</List>
				<Divider />
				<List>
					<h4>
						<strong>Payment Details</strong>
					</h4>
					<ListItem>
						<ListItemText
							primary="Date Of Order:"
							secondary={orderDetails.dateOfOrder}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Total Cost:"
							secondary={`Rs ${orderDetails.totalCost}`}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="razorpayPaymentId:"
							secondary={orderDetails.razorpayPaymentId}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="razorpayOrderId"
							secondary={orderDetails.razorpayOrderId}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="razorpaySignature"
							secondary={orderDetails.razorpaySignature}
						/>
					</ListItem>
				</List>
				<Divider />
			</Dialog>
		</div>
	);
};

const Orders = ({ setAdmin }) => {
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const history = useHistory();
	const { setIsAuth } = useContext(Authentication);
	const [orders, setOrders] = useState([]);
	const [showMore, setShowMore] = useState(false);
	const [orderDetails, setOrderDetails] = useState({
		_id: "",
		user: {
			name: { firstName: "", lastName: "" },
			phone: "",
			email: "",
			address: "",
		},
		order: [],
		dateOfOrder: "",
		totalCost: 0,
		razorpayPaymentId: "",
		razorpayOrderId: "",
		razorpaySignature: "",
	});
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
		if (result.response) {
			let ordersData = orders.map((orderdetails) => {
				if (orderdetails._id === orderId)
					order.deliveryStatus = !order.deliveryStatus;
				return orderdetails;
			});
			setOrders(ordersData);
		} else if (result.error === "Not logged in") {
			setShowModal(true);
		} else {
			console.log("ELSEresult", result);
			setError(true);
		}
	};
	const handleClose = () => {
		setShowModal(false);
		setError(false);
	};
	return (
		<div className="adminPanel">
			<OrderDetails
				orderDetails={orderDetails}
				showMore={showMore}
				setShowMore={setShowMore}
			/>

			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>OOPS!!</Modal.Title>
				</Modal.Header>
				<Modal.Body>Session Timeout</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose} href="/login">
						Login
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={error} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>OOPS!!</Modal.Title>
				</Modal.Header>
				<Modal.Body>Customer Does Not Exist!!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						close
					</Button>
				</Modal.Footer>
			</Modal>

			<h1>Orders</h1>
			<main>
				<table>
					<tbody>
						<tr>
							<th>
								<h4>
									<strong>Order ID</strong>
								</h4>
							</th>
							<th>
								<h4>
									<strong>Customer Name</strong>
								</h4>
							</th>
							<th>
								<h4>
									<strong>Customer Phone</strong>
								</h4>
							</th>
							<th>
								<h4>
									<strong>Order Cost</strong>
								</h4>
							</th>
							<th>
								<h4>
									<strong>Delivery Status</strong>
								</h4>
							</th>
							<th></th>
						</tr>
					</tbody>
					{orders
						.slice(0)
						.reverse()
						.map((order, index) => {
							return (
								<tbody key={index}>
									<tr>
										<td>
											<h5 className="m-2"> {order._id}</h5>
										</td>
										<td>
											<h5>
												{order.user.name.firstName} {order.user.name.lastName}
											</h5>
										</td>

										<td>
											<h5 className="m-2"> {order.user.phone}</h5>
										</td>
										<td>
											<h5 className="m-2"> Rs {order.totalCost}</h5>
										</td>
										<td>
											<button
												className={`btn ${
													order.deliveryStatus ? "btn-success" : "btn-warning"
												} float-right mr-2 shadow`}
												onClick={() => handleDeliveryStatus(order)}
											>
												{order.deliveryStatus ? "DELIVERED" : "PENDING"}
											</button>
										</td>
										<td>
											<button
												className="btn btn-primary float-right mr-3 shadow"
												onClick={() => {
													setOrderDetails(order);
													setShowMore(true);
												}}
											>
												More
											</button>
										</td>
									</tr>
								</tbody>
							);
						})}
				</table>
			</main>
		</div>
	);
};

export default Orders;

/**********************************************************OLD CODE************************************************************* */
/*
// {orders.map((order, index) => {
// 					return (
// 						<div className=" box box-orders user-form" key={index}>
// 							/* ORDER ID */
// 							<div>
// 								<strong>orderId:</strong>
// 								<span>{order._id}</span>
// 							</div>
// 							{/* USER DETAILS */}
// 							<div className="order-div">
// 								<div>
// 									<div style={{ textAlign: "center" }}>
// 										<strong>User Details</strong>
// 									</div>
// 									<div className="orderbox">
// 										<div>
// 											<strong>First Name:</strong>
// 											{order.user.name.firstName}
// 										</div>
// 										<div>
// 											<strong>Last Name:</strong>
// 											{order.user.name.lastName}
// 										</div>
// 										<div>
// 											<strong>Phone:</strong>
// 											{order.user.phone}
// 										</div>
// 										<div>
// 											<strong style={{ textAlign: "center" }}>Email:</strong>
// 											{order.user.email}
// 										</div>
// 										<div>
// 											<strong>Address:</strong>
// 											{order.user.address}
// 										</div>
// 									</div>
// 								</div>
// 								{/* PAYMENT DETAILS */}
// 								<div className="order-div">
// 									<div style={{ textAlign: "center" }}>
// 										<strong>Payment Details</strong>
// 									</div>
// 									<div className="orderbox">
// 										<div>
// 											<strong>Date Of Order:</strong>
// 											{order.dateOfOrder}
// 										</div>
// 										<div>
// 											<strong>Total Cost:</strong>
// 											{order.totalCost}
// 										</div>
// 										<div>
// 											<strong>razorpay PaymentId:</strong>
// 											{order.razorpayPaymentId}
// 										</div>
// 										<div>
// 											<strong>razorpay OrderId:</strong>
// 											{order.razorpayOrderId}
// 										</div>
// 										<div>
// 											<strong>razorpay Signature:</strong>
// 											{order.razorpaySignature}
// 										</div>
// 									</div>
// 								</div>
// 								{/* ORDER */}
// 								<div className="order-div">
// 									<div style={{ textAlign: "center" }}>
// 										<strong>Order Details</strong>
// 									</div>
// 									<div className="orderbox">
// 										{order.order.map((itemDetails, index) => {
// 											return (
// 												<div className="order-item-div " key={index}>
// 													<div>
// 														<strong>Item Id:</strong>
// 														{itemDetails.item._id}
// 													</div>
// 													<div>
// 														<strong>Item Name:</strong>
// 														{itemDetails.item.itemName}
// 													</div>
// 													<div>
// 														<strong>Qty:</strong>
// 														{itemDetails.Qty}
// 													</div>
// 												</div>
// 											);
// 										})}
// 									</div>
// 								</div>
// 							</div>
// 							<button
// 								onClick={() => {
// 									handleDeliveryStatus(order);
// 								}}
// 							>
// 								<strong>
// 									{order.deliveryStatus ? (
// 										<span className="delivered">DELIVERED</span>
// 									) : (
// 										<span className="pending">PENDING</span>
// 									)}
// 								</strong>
// 							</button>
// 						</div>
// 					);
// 				})}
