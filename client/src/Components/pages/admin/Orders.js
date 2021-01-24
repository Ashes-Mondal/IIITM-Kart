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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";

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
	form: {
		marginLeft: "2rem",
		width: "40%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	root: {
		backgroundColor: "#ede7f6",
		display: "flex",
		flexGrow: 1,
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
				style={{ width: "100vw" }}
				fullScreen
				open={showMore}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar style={{ width: "100vw" }} className={classes.appBar}>
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
							<span>
								<strong>orderId: </strong>
							</span>{" "}
							{orderDetails.razorpayOrderId}
						</Typography>
					</Toolbar>
				</AppBar>
				<div
					style={{
						marginBottom: "2vh",
						marginTop: "2vh",
						width: "100vw",
						height: "auto",
						overflowY: "scroll",
						fontSize: "130%",
					}}
				>
					<strong>User Details</strong>

					<Typography variant="h6" className={classes.title}>
						UserId:{" "}
						<span style={{ color: "#808080" }}>{orderDetails.user._id}</span>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						Email:{" "}
						<span style={{ color: "#808080" }}>{orderDetails.user.email}</span>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						Phone:{" "}
						<span style={{ color: "#808080" }}>{orderDetails.user.phone}</span>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						Address:{" "}
						<span style={{ color: "#808080" }}>{orderDetails.user._id}</span>
					</Typography>
				</div>
				<Divider style={{ width: "100vw" }} />
				<div
					style={{
						marginBottom: "2vh",
						marginTop: "2vh",
						width: "100vw",
						height: "auto",
						overflowY: "scroll",
						fontSize: "130%",
					}}
				>
					<strong>Shipping Address</strong>

					<Typography variant="h6" className={classes.title}>
						<span style={{ color: "#808080" }}>
							{orderDetails.shippingAddress}
						</span>
					</Typography>
				</div>
				<Divider style={{ width: "100vw" }} />
				<div
					style={{
						marginBottom: "2vh",
						marginTop: "2vh",
						width: "100vw",
						height: "auto",
						overflowY: "scroll",
						fontSize: "130%",
					}}
				>
					<strong>Payment Details</strong>

					<Typography variant="h6" className={classes.title}>
						Total Cost:{" "}
						<span style={{ color: "#808080" }}>
							Rs {orderDetails.totalCost}
						</span>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						razorpayOrderId:{" "}
						<span style={{ color: "#808080" }}>
							{orderDetails.razorpayOrderId}
						</span>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						razorpayPaymentId:{" "}
						<span style={{ color: "#808080" }}>
							{orderDetails.razorpayPaymentId}
						</span>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						razorpaySignature:{" "}
						<span style={{ color: "#808080" }}>
							{orderDetails.razorpaySignature}
						</span>
					</Typography>
				</div>
				<Divider style={{ width: "100vw" }} />
				<div
					style={{
						marginBottom: "2vh",
						marginTop: "2vh",
						width: "100vw",
						height: "auto",
						fontSize: "130%",
					}}
				>
					<strong>Items ordered</strong>

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
				</div>
			</Dialog>
		</div>
	);
};

const Orders = ({ setAdmin }) => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [showProcessing, setShowProcessing] = useState(true);
	const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const history = useHistory();
	const [search, setSearch] = useState("");
	const { setIsAuth } = useContext(Authentication);
	const [orders, setOrders] = useState([]);
	const [displayOrders, setDisplayOrders] = useState([]);
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
				setDisplayOrders(result.ordersData);
				setShowProcessing(false);
				console.log("order Use Effect");
			} else {
				setOrders([]);
				setDisplayOrders([]);
				setIsAuth(false);
				setAdmin(false);
				history.push("/login");
			}
		};
		fetchAllOrders();
	}, [history, setIsAuth, setAdmin, setDisplayOrders]);

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
			setError(true);
		}
	};
	const handleClose = () => {
		setShowModal(false);
		setError(false);
	};

	const showDeliveryStatus = (cancelledStatus, deliveryStatus) => {
		if (cancelledStatus && deliveryStatus) return "Returned";
		if (cancelledStatus) return "Cancelled";
		if (deliveryStatus) return "Delivered";
		else return "Pending";
	};
	const showDeliveredOrders = () => {
		let adminUser = orders.filter(
			(order) => !order.cancelledStatus && order.deliveryStatus
		);
		setDisplayOrders(adminUser);
	};
	const showPendingOrders = () => {
		let normalUser = orders.filter(
			(order) => !order.cancelledStatus && !order.deliveryStatus
		);
		setDisplayOrders(normalUser);
	};
	const showAllOrders = () => {
		setDisplayOrders(orders);
	};
	const showCancelledOrders = () => {
		let adminUser = orders.filter(
			(order) => order.cancelledStatus && !order.deliveryStatus
		);
		setDisplayOrders(adminUser);
	};
	const showReturnedOrders = () => {
		let adminUser = orders.filter(
			(order) => order.cancelledStatus && order.deliveryStatus
		);
		setDisplayOrders(adminUser);
	};

	const handleFilter = () => {
		setValue(0);
		if (search === "") {
			setDisplayOrders(orders);
			return;
		}
		let filteredList = orders.filter(
			(order) =>
				search === order.user.name.firstName ||
				search === order.user.name.lastName ||
				search === `${order.user.name.firstName} ${order.user.name.lastName}` ||
				search === order._id ||
				search === order.user.phone ||
				search === order.user.email ||
				search === order.razorpayPaymentId ||
				search === order.razorpayOrderId ||
				search === order.razorpaySignature
		);
		if (filteredList.length < 1) {
			alert("No result found!");
			return;
		}
		setDisplayOrders(filteredList);
	};
	return (
		<div style={{ width: "90vw" }} className="adminPanel">
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
			<nav style={{ top: "4.1rem" }} className="sticky-top">
				<Paper className={classes.root}>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab onClick={showAllOrders} label="All Orders" />
						<Tab onClick={showPendingOrders} label="Pending" />
						<Tab onClick={showDeliveredOrders} label="Delivered" />
						<Tab onClick={showCancelledOrders} label="Cancelled" />
						<Tab onClick={showReturnedOrders} label="Returned" />
					</Tabs>
					<form
						className={classes.form}
						onSubmit={(e) => {
							e.preventDefault();
							handleFilter();
						}}
					>
						<input
							className="form-control col-xs-4"
							type="search"
							placeholder="search"
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
						<button
							type="submit"
							class="btn btn-warning btn-circle btn-lg ml-1"
						>
							<SearchIcon />
						</button>
					</form>
				</Paper>
			</nav>
			{showProcessing ? <LinearProgress color="secondary" /> : null}
			<main>
				<table>
					<thead>
						<tr>
							<th style={{ top: "7.25rem" }} className="sticky-top">
								<h4>
									<strong>Order ID</strong>
								</h4>
							</th>
							<th style={{ top: "7.25rem" }} className="sticky-top">
								<h4>
									<strong>Customer Name</strong>
								</h4>
							</th>
							<th style={{ top: "7.25rem" }} className="sticky-top">
								<h4>
									<strong>Customer Phone</strong>
								</h4>
							</th>
							<th style={{ top: "7.25rem" }} className="sticky-top">
								<h4>
									<strong>Order Cost</strong>
								</h4>
							</th>
							<th style={{ top: "7.25rem" }} className="sticky-top">
								<h4>
									<strong>Delivery Status</strong>
								</h4>
							</th>
							<th style={{ top: "7.25rem" }} className="sticky-top"></th>
						</tr>
					</thead>

					<tbody>
						{displayOrders
							.slice(0)
							.reverse()
							.map((order, index) => {
								return (
									<tr>
										<td>
											<h6 className="m-2"> {order.razorpayOrderId}</h6>
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
												className={` btn ${
													order.cancelledStatus
														? "btn-danger"
														: order.deliveryStatus
														? "btn-success"
														: "btn-warning"
												} mr-2 shadow`}
												disabled={order.cancelledStatus}
												onClick={() => handleDeliveryStatus(order)}
											>
												{showDeliveryStatus(
													order.cancelledStatus,
													order.deliveryStatus
												)}
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
								);
							})}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default Orders;

/************************************************Old Code Modal more button************************** */
/*
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

				<Divider />
				<List>
					<h4>
						<strong>Shipping Address:</strong>
					</h4>
					<ListItem>
						<ListItemText
							primary={
								orderDetails.shippingAddress || orderDetails.user.address
							}
						/>
					</ListItem>
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
				</List>*/
