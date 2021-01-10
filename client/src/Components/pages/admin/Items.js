import React from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const Items = ({ itemList, setItemList }) => {
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState("");
	const deleteItem = async (itemId) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				itemId: itemId,
			}),
		};
		const result = await (await fetch("/deleteItem", requestOptions)).json();
		if (result.response) {
			itemList = itemList.filter((itemElement) => itemElement._id !== itemId);
			setItemList(itemList);
		} else if(result.error === "Not logged in") {
			setShowModal(true)
		}else{
			setError("result.error._message")
		}
	};

	const handleClose = () => {
		setShowModal(false);
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
			{error !== "" ? (
				<Alert variant="danger">
					<Alert.Heading>
						<h5 style={{ textAlign: "center" }}>{error}</h5>
					</Alert.Heading>
				</Alert>
			) : null}

			<h1>Items</h1>
			<Link to="/admin/addItem" className="text-white">
				<button className="btn btn-primary addItemButton">+ Add an Item</button>
			</Link>
			<table>
				<tbody>
					<tr>
						<th>Item Name</th>
						<th>Item ID</th>
						<th></th>
						<th></th>
					</tr>
				</tbody>
				{itemList.map((item, index) => {
					return (
						<tbody key={index}>
							<tr>
								<td>
									<h3>{item.itemName}</h3>
								</td>
								<td>
									<h5 className="m-2"> {item._id}</h5>
								</td>
								<td>
									<Link
										to={`/admin/editItem/${item._id}`}
										className="text-white"
									>
										<button className="btn btn-primary float-right mr-3 shadow">
											Edit
										</button>
									</Link>
								</td>
								<td>
									<button
										className="btn btn-danger float-right shadow"
										onClick={() => {
											deleteItem(item._id);
										}}
									>
										Delete
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
			</table>
		</div>
	);
};

export default Items;
