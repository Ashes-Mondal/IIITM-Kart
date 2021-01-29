import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Authentication } from "../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ShoppingCart({ cart, setCart, user, setUser }) {
	const [state, setState] = useState({
		open: false,
		vertical: "top",
		horizontal: "center",
	});
	const [showProcessing, setShowProcessing] = useState(false);
	const { vertical, horizontal, open } = state;
	const { isAuth, setIsAuth } = useContext(Authentication);
	const [showModal, setShowModal] = useState(false);
	const [shippingAddress, setShippingAddress] = useState(user.address);
	const [showCartModal, setShowCartModal] = useState(false);
	const [showAddressModal, setShowAddressModal] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [editable, setEditable] = useState(false);
	const [confirmClearCartModal, setConfirmClearCartModal] = useState(false);
	const history = useHistory();

	const getTotalSum = () => {
		let total = cart.reduce((sum, { item, Qty }) => sum + item.cost * Qty, 0);
		return total;
	};

	//clears the cart
	const clearCart = async () => {
		setConfirmClearCartModal(false);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ userId: user._id }),
		};
		const result = await (await fetch("/clearCart", requestOptions)).json();
		if (result.response) {
			setCart([]);
		} else {
			setShowModal(true);
			// alert("Could not clear the cart!");
		}
	};
	// increase qty of item by 1
	const plusItemQuantity = async (Product) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: user._id,
				itemId: Product.item._id,
				itemQty: Product.Qty + 1,
			}),
		};
		const result = await (await fetch("/updateQty", requestOptions)).json();
		if (result.response) {
			const tempCart = cart.map((product) => {
				if (product.item._id === Product.item._id) {
					product.Qty = product.Qty + 1;
				}
				return product;
			});
			setCart(tempCart);
		} else {
			setShowModal(true);
		}
	};

	// decrease qty of item
	const minusItemQuantity = async (Product) => {
		if (Product.Qty === 1) return;
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: user._id,
				itemId: Product.item._id,
				itemQty: Product.Qty - 1,
			}),
		};
		const result = await (await fetch("/updateQty", requestOptions)).json();
		if (result.response) {
			let tempCart = cart.map((product) => {
				if (product.item._id === Product.item._id && product.Qty > 1) {
					product.Qty = product.Qty - 1;
				}
				return product;
			});
			setCart(tempCart);
		} else {
			setShowModal(true);
		}
	};

	//Handles item removal from the cart
	const removeFromCart = async (productDetail) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: user._id,
				itemId: productDetail.item._id,
			}),
		};
		const result = await (
			await fetch("/deleteFromCart", requestOptions)
		).json();
		if (result.response) {
			setCart(cart.filter((product) => product !== productDetail));
			setState({ open: true, vertical: "top", horizontal: "center" });
		} else {
			setShowModal(true);
			// alert("Could not remove from cart!");
		}
	};

	const addOrder = async (
		razorpay_payment_id,
		razorpay_order_id,
		razorpay_signature
	) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userCart: cart,
				userOrders: user.orders,
				totalCost: getTotalSum(),
				shippingAddress: shippingAddress,
				razorpayOrderId: razorpay_order_id,
				razorpayPaymentId: razorpay_payment_id,
				razorpaySignature: razorpay_signature,
			}),
		};
		const result = await (await fetch("/addOrder", requestOptions)).json();
		if (result.response === false) {
			alert("Could not proceed further!");
			setIsAuth(false);
			setCart([]);
			history.push("/login");
		}
		clearCart();
		setUser({
			...user,
			userCart: [],
			orders: [
				...user.orders,
				{
					_id: result.orderId,
					order: JSON.parse(JSON.stringify(cart)),
					dateOfOrder: new Date().toString(),
					totalCost: getTotalSum(),
					razorpayOrderId: razorpay_order_id,
					razorpayPaymentId: razorpay_payment_id,
					razorpaySignature: razorpay_signature,
				},
			],
		});
	};

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	const proceedPayment = async () => {
		setShowAddressModal(false);
		if (cart.length < 1) {
			setShowCartModal(true);
			return;
		}
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) {
			alert("Razorpay SDK failed to load. Are you online?");
			return;
		}
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ totalAmt: getTotalSum() }),
		};
		const data = await (await fetch("/paymentOrder", requestOptions)).json();
		if (data.response === false) {
			setShowModal(true);
			return;
		}
		const options = {
			key: "rzp_test_qCpeI02RHqv1vw",
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: "Payment",
			description: "Please verify your phone number and email",
			image:
				"data:image/png;base64,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",
			handler: async function(response) {
				if (response.razorpay_payment_id) {
					setShowProcessing(true);
					setCart([]);
					await addOrder(
						response.razorpay_payment_id,
						response.razorpay_order_id,
						response.razorpay_signature
					);
					setShowProcessing(false);
					setShowPaymentModal(true);
				}
			},
			prefill: {
				email: user.email,
				contact: user.phone,
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	const handleClose = () => {
		setShowPaymentModal(false);
		setShowModal(false);
		setShowCartModal(false);
		setShowAddressModal(false);
		setState({ open: false, vertical: "top", horizontal: "center" });
		setConfirmClearCartModal(false);
	};
	return (
		<>
			{showProcessing ? <LinearProgress color="secondary" /> : null}
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				onClose={handleClose}
				autoHideDuration={4000}
				key={vertical + horizontal}
			>
				<Alert onClose={handleClose} severity="success">
					Sucessfully removed from the cart
				</Alert>
			</Snackbar>
			{/* MODALS */}
			{/* PAYMENT  */}
			<Modal show={showPaymentModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Payment Result</Modal.Title>
				</Modal.Header>
				<Modal.Body>Your Order has been placed</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose} href="/user">
						See Your Order
					</Button>
				</Modal.Footer>
			</Modal>
			{/* CART CRUD */}
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
			{/* EMPTY CART */}
			<Modal show={showCartModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>OOPS!!</Modal.Title>
				</Modal.Header>
				<Modal.Body>Your cart looks empty</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose} href="/">
						Start shopping
					</Button>
				</Modal.Footer>
			</Modal>
			{/* Change Address */}
			<Modal
				show={showAddressModal}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						<h3>Total Cost: Rs. {getTotalSum()}</h3>
						<br />
						Please confirm your Shipping Address
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{editable ? (
						<h6
							className="edituser"
							onClick={() => {
								setEditable(false);
							}}
						>
							Update Address
						</h6>
					) : (
						<h6
							className="edituser"
							onClick={() => {
								setEditable(true);
							}}
						>
							Change Address
						</h6>
					)}
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							value={shippingAddress || ""}
							name="Address"
							disabled={editable ? "" : "disabled"}
							onChange={(e) => {
								setShippingAddress(e.target.value);
							}}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<span>
						<Button className="btn btn-success" onClick={proceedPayment}>
							Proceed to Payment
						</Button>
					</span>
					<span>
						<Button className="btn btn-danger" onClick={handleClose}>
							Close
						</Button>
					</span>
				</Modal.Footer>
			</Modal>
			{/* CONFIRM CLEAR CART */}
			<Modal show={confirmClearCartModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you Sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>Do you want to delete your cart items?</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={clearCart}>
						Yes
					</Button>
					<Button
						variant="primary"
						onClick={() => setConfirmClearCartModal(false)}
					>
						No
					</Button>
				</Modal.Footer>
			</Modal>

			<div className="gridContainer userbackground">
				{cart.length ? (
					<div className="flex-child2 cartTotalContainer sticky-top">
						<h1>Cart Total</h1>
						<br />
						<p className="cartDetail">
							<b>Item</b>
							<span className="side">
								<b>Qty x Cost(Rs.)</b>
							</span>
						</p>
						{cart.map((productDetail, index) => {
							const { item, Qty } = productDetail;
							return (
								<div key={index}>
									<p>
										{item.itemName}
										<span className="side">
											{Qty} x {item.cost}
										</span>
									</p>
									<hr />
								</div>
							);
						})}
						<h4 className="tc">Total Cost: Rs. {getTotalSum()}</h4>
						{isAuth ? (
							<button
								className="btnProceed"
								onClick={() => setShowAddressModal(true)}
							>
								Place this Order
							</button>
						) : null}
					</div>
				) : null}
				<div
					className={
						cart.length ? "flex-child1 cartContainer" : " bg-white  rounded p-3"
					}
				>
					<h1>My Cart</h1>
					{cart.length ? (
						<button
							className="clearCartBtn"
							onClick={() => setConfirmClearCartModal(true)}
						>
							Clear Cart
						</button>
					) : (
						<div
							style={{
								height: "40rem",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<img
								style={{
									margin: "auto",
									width: "100%",
									height: "100%",
								}}
								src="https://professionalscareer.com/assets/images/emptycart.png"
								alt="Cart is empty"
							/>

							<button className="btnShop">
								<Link to="/" className="text-white mb-5">
									Start Shopping Now
								</Link>
							</button>
						</div>
					)}
					{cart.map((productDetail, index) => {
						const { item, Qty } = productDetail;
						return (
							<div className="cartItemContainer " key={index}>
								<h3>{item.itemName}</h3>
								<div className="d-flex">
									<div className="flex-child3">
										<a
											style={{
												color: "#696969",
												textDecoration: "none",
											}}
											href={`/productDetails/${item._id}`}
										>
											<img
												className="cartEmpty"
												src={item.imageURL}
												alt={item.itemName}
											/>
										</a>
									</div>
									<div className="flex-child4">
										<h5>{item.description}</h5>
										<h4>Rs. {item.cost}</h4>
										<button
											className="qtyBtn mb-2"
											onClick={() => {
												minusItemQuantity(productDetail);
											}}
										>
											-
										</button>
										<span className="qtyInput">{Qty}</span>
										<button
											className="qtyBtn mb-2"
											onClick={() => {
												plusItemQuantity(productDetail);
											}}
										>
											+
										</button>
										<br />
										<button
											className="removeBtn mb-3"
											onClick={() => removeFromCart(productDetail)}
										>
											Remove this Item
										</button>
									</div>
								</div>
								<hr color="black" />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default ShoppingCart;
