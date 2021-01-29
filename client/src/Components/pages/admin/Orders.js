import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
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
import SearchBar from "material-ui-search-bar";
import ScrollTop from "../ScrollTop"

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
	tabRoot: {
		backgroundColor: "#ede7f6",
		display: "flex",
		flexGrow: 1,
	},
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

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const OrderDetails = ({ orderDetails, showMore, setShowMore }) => {
	const classes = useStyles();
	const handleClose = () => {
		setShowMore(false);
	};

	return (
		<div style={{ width: "100vw" }}>
			<ScrollTop showBelow={400}/>
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
							<span>
								<strong>orderId: </strong>
							</span>{" "}
							{orderDetails.razorpayOrderId}
						</Typography>
					</Toolbar>
				</AppBar>
				<main style={{ width: "100vw" }}>
					<div
						style={{
							margin: "2vh 0vw",
							padding: "0vh 2vw",
							width: "100vw",
							height: "auto",
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
							<span style={{ color: "#808080" }}>
								{orderDetails.user.email}
							</span>
						</Typography>
						<Typography variant="h6" className={classes.title}>
							Phone:{" "}
							<span style={{ color: "#808080" }}>
								{orderDetails.user.phone}
							</span>
						</Typography>
						<Typography variant="h6" className={classes.title}>
							Address:{" "}
							<span style={{ color: "#808080" }}>{orderDetails.user._id}</span>
						</Typography>
					</div>
					<Divider style={{ width: "100vw" }} />
					<div
						style={{
							margin: "2vh 0vw",
							padding: "0vh 2vw",
							width: "100vw",
							height: "auto",
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
							margin: "2vh 0vw",
							padding: "0vh 2vw",
							width: "100vw",
							height: "auto",
							fontSize: "130%",
							overflow: "hidden",
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
							margin: "2vh 0vw",
							padding: "0vh 2vw",
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
				</main>
			</Dialog>
		</div>
	);
};

const Orders = ({setAdmin}) => {
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
	const [showSearchBar, setShowSearchBar] = useState(true);
	useEffect(() => {
		const fetchAllOrders = async () => {
			const result = await (await fetch("/fetchAllOrders")).json();
			if (result.response === true) {
				setOrders(result.ordersData);
				setDisplayOrders(result.ordersData);
				setShowProcessing(false);
				// console.log("order Use Effect");
			} else {
				setOrders([]);
				setDisplayOrders([]);
				setIsAuth(false);
				setAdmin(false);
				history.push("/login");
			}
		};
		fetchAllOrders();
		const setResponsiveness = () => {
			if (window.innerWidth < 1110) return setShowSearchBar(false);
			else return setShowSearchBar(true);
		};

		setResponsiveness();
		window.addEventListener("resize", () => setResponsiveness());
		return function cleanup() {
			window.removeEventListener("resize", () => setResponsiveness());
		};
	}, [history, setIsAuth,setAdmin, setDisplayOrders]);

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
		const filterSearch = (itemList, Search) => {
			for (let wordIndex = 1; wordIndex < Search.length; wordIndex++) {
				if (wordIndex === 0) continue;
				itemList = itemList.filter((itemObject) => {
					let flag = false;
					let findResult = new RegExp(Search[wordIndex], "ig");

					//testing on firstName
					flag = findResult.test(itemObject.user.name.firstName);
					if (flag) return itemObject;
					//testing on lastName
					flag = findResult.test(itemObject.user.name.lastName);
					if (flag) return itemObject;
					//testing on phone
					flag = findResult.test(itemObject.user.phone);
					if (flag) return itemObject;
					//testing on email
					flag = findResult.test(itemObject.user.email);
					if (flag) return itemObject;

					return null;
				});
			}
			return itemList;
		};

		const Search = search.split(" ");
		//parent searching based on first word
		const firstWord = Search[0];
		const regex = new RegExp("\\b" + firstWord + "\\b", "gi");
		// console.log(regex.test("POCO X3"))
		let combinedResult = [];
		for (let i = 0; i < orders.length; i++) {
			//razorPay Orderid
			if (search === orders[i].razorpayOrderId) {
				combinedResult.push(orders[i]);
				continue;
			}
			// customer Name
			if (regex.test(orders[i].user.name.firstName)) {
				combinedResult.push(orders[i]);
				continue;
			}
			if (regex.test(orders[i].user.name.lastName)) {
				combinedResult.push(orders[i]);
				continue;
			}
			//phone
			if (regex.test(orders[i].user.phone)) {
				combinedResult.push(orders[i]);
				continue;
			}
			//email
			if (regex.test(orders[i].user.email)) {
				combinedResult.push(orders[i]);
				continue;
			}
		}
		//filtering based on further words in search string
		let itemList = combinedResult;
		if (Search.length > 1 && itemList.length)
			itemList = filterSearch(itemList, Search);
		if (itemList.length) setDisplayOrders(itemList);
		else alert("No result found!");
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
			{showProcessing ? <LinearProgress color="secondary" /> : null}
			<nav style={{ top: "3.5rem" }} className="sticky-top mb-1">
				<Paper className={classes.tabRoot}>
					<Tabs
						style={{ display: "flex", flex: "1 1 auto" }}
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab
							style={{ flex: "1 1 auto" }}
							onClick={showAllOrders}
							label="All Orders"
						/>
						<Tab
							style={{ flex: "1 1 auto" }}
							onClick={showDeliveredOrders}
							label="Delivered"
						/>
						<Tab
							style={{ flex: "1 1 auto" }}
							onClick={showPendingOrders}
							label="Pending"
						/>
						<Tab
							style={{ flex: "1 1 auto" }}
							onClick={showCancelledOrders}
							label="Cancelled"
						/>
						<Tab
							style={{ flex: "1 1 auto" }}
							onClick={showReturnedOrders}
							label="Returned"
						/>
					</Tabs>
					{showSearchBar ? (
						<form
							style={{
								flex: "2 2 auto",
								marginLeft: "1rem",
								marginRight: "2rem",
							}}
							className={classes.form}
							onSubmit={(e) => {
								e.preventDefault();
								handleFilter();
							}}
						>
							<input
								className="form-control"
								type="search"
								placeholder="Search"
								value={search}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
							<button
								type="submit"
								className="btn btn-warning btn-circle btn-lg ml-1"
							>
								<SearchIcon />
							</button>
						</form>
					) : null}
				</Paper>
			</nav>
			{showSearchBar ? null : (
				<SearchBar
					type="text"
					placeholder="Search"
					onChange={(value) => {
						setSearch(value);
					}}
					onRequestSearch={() => handleFilter()}
					style={{
						width: "100%",
						alignSelf: "center",
						height: "2rem",
					}}
				/>
			)}

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
							<StyledTableCell style={{ fontSize: "1rem" }} align="center">
								Learn More!
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{displayOrders
							.slice(0)
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
										<button
											className={`btn ${
												order.cancelledStatus
													? "btn-danger"
													: order.deliveryStatus
													? "btn-success"
													: "btn-warning"
											} mr-2 shadow ordersBtn`}
											disabled={order.cancelledStatus ? "disabled" : ""}
											onClick={() => handleDeliveryStatus(order)}
										>
											{showDeliveryStatus(
												order.cancelledStatus,
												order.deliveryStatus
											)}
										</button>
									</StyledTableCell>
									<StyledTableCell align="center">
										<button
											className="btn btn-primary float-right mr-3 shadow"
											onClick={() => {
												setOrderDetails(order);
												setShowMore(true);
											}}
										>
											More
										</button>
									</StyledTableCell>
								</StyledTableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default Orders;
