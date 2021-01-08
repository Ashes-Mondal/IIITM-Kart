import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddItem = ({ setLoaded }) => {
	const history = useHistory();
	const [error, setError] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [itemDetails, setItemDetails] = useState({
		category: "",
		cost: "",
		description: "",
		imageURL: "",
		itemName: "",
	});

	const handleAddItem = async (e) => {
		e.preventDefault();
		//POSTING THE FORM
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				category: itemDetails.category,
				cost: itemDetails.cost,
				imageURL: itemDetails.imageURL,
				itemName: itemDetails.itemName,
				description: itemDetails.description,
			}),
		};
		const result = await (await fetch("/addItem", requestOptions)).json();
		if (result.response) {
			setLoaded(false);
			history.push("/admin/items");
			history.go();
		} else if (result.error === "Not logged in") {
			setShowModal(true);
		}else{
      setError(result.error._message);
    }
	};

	const handleClose = () => {
		setShowModal(false);
	};
	return (
		<div className="adminPanel ">
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
			<h1>Add Item</h1>
			<form className="effect3D" onSubmit={handleAddItem}>
				<h3>Enter Item Details</h3>
				<div className="row">
					<div className="col-12">
						<label>Item Name: </label>
						<input
							type="text"
							name="itemName"
							// placeholder="Item Name"
							required
							value={itemDetails.itemName}
							onChange={(e) => {
								setItemDetails({ ...itemDetails, itemName: e.target.value });
							}}
						></input>
					</div>
					<div className="col-12">
						<label>Description: </label>
						<input
							type="text"
							name="description"
							// placeholder="Description"
							required
							value={itemDetails.description}
							onChange={(e) => {
								setItemDetails({ ...itemDetails, description: e.target.value });
							}}
						></input>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<label>Category: </label>
						<input
							type="text"
							name="category"
							// placeholder="Category"
							required
							value={itemDetails.category}
							onChange={(e) => {
								setItemDetails({ ...itemDetails, category: e.target.value });
							}}
						></input>
					</div>
					<div className="col-12">
						<label>Cost: </label>
						<input
							type="text"
							name="cost"
							// placeholder="Cost"
							required
							value={itemDetails.cost}
							onChange={(e) => {
								setItemDetails({ ...itemDetails, cost: e.target.value });
							}}
						></input>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<label>Image URL: </label>
						<input
							type="text"
							name="imageURL"
							// placeholder="Image URL"
							required
							value={itemDetails.imageURL}
							onChange={(e) => {
								setItemDetails({ ...itemDetails, imageURL: e.target.value });
							}}
						></input>
					</div>
				</div>
				<button className="btn btn-primary">Add Item</button>
				<Link to="/admin/items" className="text-white">
					<button className="btn btn-danger ml-3 float-right">Cancel</button>
				</Link>
			</form>
		</div>
	);
};

export default AddItem;
