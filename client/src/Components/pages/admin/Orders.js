import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Orders = ({ setAdmin, setCart }) => {
  const [error, setError] = useState(false);
	const [showModal, setShowModal] = useState(false);
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
    console.log("PD_result",result)
    if(result.response){
      let ordersData = orders.map((orderdetails) => {
				if (orderdetails._id === orderId)
					order.deliveryStatus = !order.deliveryStatus;
				return orderdetails;
			});
			setOrders(ordersData);
    }
		else if (result.error === "Not logged in") {
      setShowModal(true);
		} else {
      console.log("ELSEresult",result)
			setError(true);
		}
	};
  const handleClose = () => {
    setShowModal(false);
    setError(false);
	};
	return (
		<div className="adminPanel">
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
					<Button variant="secondary" onClick={handleClose} >
						close
					</Button>
				</Modal.Footer>
			</Modal>
			
			<h1>Orders</h1>
			<main>
				{orders.map((order, index) => {
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
				})}
			</main>
		</div>
	);
};

export default Orders;
