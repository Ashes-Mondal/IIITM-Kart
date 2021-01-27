import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
	const [showSearchBar, setShowSearchBar] = useState(true);
	useEffect(() => {
		const setResponsiveness = () => {
			if (window.innerWidth < 663) return setShowSearchBar(false);
			else return setShowSearchBar(true);
		};

		setResponsiveness();
		window.addEventListener("resize", () => setResponsiveness());
	}, []);
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
				style={{ display: "flex", alignItems: "center", top: "3.5rem" }}
				className="sticky-top"
			>
				<Paper className={classes.root}>
					<Link
						to="/admin/addItem"
						className="text-white"
						style={{ flex: "1 1 auto" }}
					>
						<button className="btn btn-primary addItemButton">
							+ Add an Item
						</button>
					</Link>

					<Button
						style={{ margin: "10px", flex: "1 1 auto" }}
						onClick={handleReset}
					>
						Reset
					</Button>
					{showSearchBar ? (
						<form
							style={{ flex: "2 2 auto", marginRight: "2rem" }}
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
					) : null}
				</Paper>
			</nav>
			{showSearchBar ? null : (
				<SearchBar
					type="text"
					placeholder="search product"
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
								Item Id
							</StyledTableCell>
							<StyledTableCell style={{ fontSize: "1rem" }} align="center">
								Item Name
							</StyledTableCell>
							<StyledTableCell style={{ fontSize: "1rem" }} align="center">
								Cost
							</StyledTableCell>
							<StyledTableCell style={{ fontSize: "1rem" }} align="center">
								Update
							</StyledTableCell>
							<StyledTableCell style={{ fontSize: "1rem" }} align="center">
								Delete
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productItems.map((item, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component="th" scope="row">
									{item._id}
								</StyledTableCell>
								<StyledTableCell align="center">
									{item.itemName}
								</StyledTableCell>
								<StyledTableCell align="center">Rs {item.cost}</StyledTableCell>
								<StyledTableCell align="center">
									<Link
										to={`/admin/editItem/${item._id}`}
										className="text-white"
									>
										<button className="btn btn -sm btn-primary mr-3 shadow">
											Edit
										</button>
									</Link>
								</StyledTableCell>
								<StyledTableCell align="center">
									<button
										className="btn btn -sm btn-danger shadow"
										onClick={() => {
											setDeleteItem(item);
											setConfirmDeleteItemModal(true);
											// deleteItem(item._id);
										}}
									>
										Delete
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

export default Items;

/********************************************Main Code(DO NOT DELETE_)******************************************* */

{
	/* <div className="adminPanel">
			
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
							<tr key={index}>
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
				</div>  */
}
