import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	form: {
		marginLeft: "2rem",
		width: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	root: {
		alignItems: "center",
		backgroundColor: "#ede7f6",
		display: "flex",
		flexGrow: 1,
	},
}));

const Items = ({ itemList, setItemList }) => {
	const classes = useStyles();
	const [showModal, setShowModal] = useState(false);
	const [productItems, setProductItems] = useState(itemList);
	const [search, setSearch] = useState("");
	const [error, setError] = useState("");
	const [DeleteItem, setDeleteItem] = useState({
		_id: "",
		itemName: "",
	});
	const [confirmDeleteItemModal, setConfirmDeleteItemModal] = useState(false);
	const deleteItem = async () => {
		setConfirmDeleteItemModal(false);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				itemId: DeleteItem._id,
			}),
		};
		const result = await (await fetch("/deleteItem", requestOptions)).json();
		if (result.response) {
			itemList = itemList.filter(
				(itemElement) => itemElement._id !== DeleteItem._id
			);
			setItemList(itemList);
		} else if (result.error === "Not logged in") {
			setShowModal(true);
		} else {
			setError("result.error._message");
		}
	};

	const handleClose = () => {
		setShowModal(false);
		setConfirmDeleteItemModal(false);
	};

	const handleReset = () => {
		setProductItems(itemList);
		setSearch("");
	};

	const handleFilter = () => {
		if (search === "") {
			setProductItems(itemList);
			return;
		}
		let filteredList = itemList.filter(
			(item) => search === item.itemName || search === item._id
		);
		if (filteredList.length < 1) {
			alert("No result found!");
			return;
		}
		setProductItems(filteredList);
	};
	return (
		<div className="adminPanel">
			{/* DELETE ITEM MODAL */}
			<Modal show={confirmDeleteItemModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>Do yo want to delete {DeleteItem.itemName} item</Modal.Body>
				<Modal.Footer>
					<Button
						variant="danger"
						onClick={() => {
							handleClose();
							deleteItem();
						}}
					>
						Yes
					</Button>
					<Button variant="primary" onClick={handleClose}>
						No
					</Button>
				</Modal.Footer>
			</Modal>
			{/* SESSION */}
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
			<nav
				style={{ display: "flex", alignItems: "center", top: "4.1rem" }}
				className="sticky-top"
			>
				<Paper className={classes.root}>
					<Link to="/admin/addItem" className="text-white">
						<button className="btn btn-primary addItemButton">
							+ Add an Item
						</button>
					</Link>

					<Button style={{ margin: "10px" }} onClick={handleReset}>
						Reset
					</Button>
					<form
						className={classes.form}
						onSubmit={(e) => {
							e.preventDefault();
							handleFilter();
						}}
					>
						<input
							className="form-control"
							type="search"
							placeholder="search"
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
				</Paper>
			</nav>
			<table>
				<thead>
					<tr>
						<th style={{ top: "8rem" }} className="sticky-top">
							<h4>
								<strong>Item Name</strong>
							</h4>
						</th>
						<th style={{ top: "8rem" }} className="sticky-top">
							<h4>
								<strong>Item ID</strong>
							</h4>
						</th>
						<th style={{ top: "8rem" }} className="sticky-top"></th>
						<th style={{ top: "8rem" }} className="sticky-top"></th>
					</tr>
				</thead>
				<tbody>
					{productItems.map((item, index) => {
						return (
							<tr>
								<td>
									<h5>{item.itemName}</h5>
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
											setDeleteItem(item);
											setConfirmDeleteItemModal(true);
											// deleteItem(item._id);
										}}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Items;
