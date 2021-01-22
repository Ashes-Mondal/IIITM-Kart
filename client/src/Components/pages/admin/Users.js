import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	searchRoot: {
		"& > *": {
			margin: theme.spacing(1),
			width: "100ch",
		},
	},
	margin: {
		margin: theme.spacing(1),
	},
	form: {
		marginLeft: "2rem",
		width: "60%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	tabRoot: {
		backgroundColor: "#ede7f6",
		display: "flex",
		flexGrow: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const EditCustomer = ({
	Customer,
	setCustomer,
	edit,
	setEdit,
	users,
	setUsers,
	setShowModal,
}) => {
	const classes = useStyles();
	const handleClose = () => {
		setEdit(false);
		setState({ open: false, vertical: "top", horizontal: "center" });
	};
	const [state, setState] = useState({
		open: false,
		vertical: "top",
		horizontal: "center",
	});

	const { vertical, horizontal, open } = state;
	const handleEdit = async () => {
		if (
			Customer.firstName === "" ||
			Customer.lastName === "" ||
			Customer.firstName === "" ||
			Customer.phone === "" ||
			Customer.email === "" ||
			Customer.address === ""
		) {
			alert("Empty field found!");
			return;
		}
		setEdit(false);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: Customer._id,
				firstName: Customer.firstName,
				lastName: Customer.lastName,
				phone: Customer.phone,
				email: Customer.email,
				address: Customer.address,
			}),
		};
		const result = await (
			await fetch("/adminEditUserDetails", requestOptions)
		).json();
		if (result.response) {
			//finally resetting to normal
			const tempUsers = users.map((user) => {
				if (user.phone === Customer.phone) {
					let custUser = user;
					custUser.name.firstName = Customer.firstName;
					custUser.name.lastName = Customer.lastName;
					custUser.phone = Customer.phone;
					custUser.email = Customer.email;
					custUser.address = Customer.address;
					return custUser;
				}
				return user;
			});
			console.log("tempUsers", tempUsers);
			setUsers(tempUsers);
		} else if (result.error === "Not logged in") {
			setShowModal(true);
		} else {
			alert("DataBase Error occurred!!");
		}
	};

	return (
		<div>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				onClose={handleClose}
				autoHideDuration={4000}
				key={vertical + horizontal}
			>
				<Alert onClose={handleClose} severity="success">
					Sucessfully updated
				</Alert>
			</Snackbar>
			<Dialog
				fullScreen
				open={edit}
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
							User Id: {Customer._id}
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={() => {
								handleEdit();
								setState({ open: true, vertical: "top", horizontal: "center" });
							}}
						>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem>
						<TextField
							autoFocus
							margin="dense"
							required
							id="firstName"
							label="First Name"
							type="text"
							fullWidth
							value={Customer.firstName}
							onChange={(e) =>
								setCustomer({ ...Customer, firstName: e.target.value })
							}
						/>
					</ListItem>
					<ListItem>
						<TextField
							required
							margin="dense"
							id="lastName"
							label="Last Name"
							type="text"
							fullWidth
							value={Customer.lastName}
							onChange={(e) =>
								setCustomer({ ...Customer, lastName: e.target.value })
							}
						/>
					</ListItem>
					<ListItem>
						<TextField
							required
							margin="dense"
							id="phone"
							label="Phone"
							type="text"
							value={Customer.phone}
							onChange={(e) =>
								setCustomer({ ...Customer, phone: e.target.value })
							}
						/>
					</ListItem>
					<ListItem>
						<TextField
							required
							margin="dense"
							id="email"
							label="email"
							type="email"
							fullWidth
							value={Customer.email}
							onChange={(e) =>
								setCustomer({ ...Customer, email: e.target.value })
							}
						/>
					</ListItem>
					<ListItem>
						<TextField
							required
							margin="dense"
							id="address"
							label="Address"
							type="address"
							fullWidth
							value={Customer.address}
							onChange={(e) =>
								setCustomer({ ...Customer, address: e.target.value })
							}
						/>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

const Users = ({ setAdmin }) => {
	const [showProcessing, setShowProcessing] = useState(true);
	const history = useHistory();
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [makeUserAdmin, setMakeUserAdmin] = useState({
		_id: "",
		admin: false,
	});
	const [showAdminModal, setShowAdminModal] = useState(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const { setIsAuth } = useContext(Authentication);
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [Customer, setCustomer] = useState({
		_id: "",
		firstName: "",
		lastName: "",
		phone: "",
		address: "",
		email: "",
	});
	const [edit, setEdit] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchAllUsers = async () => {
			const result = await (await fetch("/fetchAllUsers")).json();
			if (result.response === true) {
				setUsers(result.usersData);
				setSelectedUsers(result.usersData);
				setShowProcessing(false);
			} else {
				setUsers([]);
				setIsAuth(false);
				setAdmin(false);
				history.push("/login");
			}
		};
		fetchAllUsers();
	}, [history, setIsAuth, setAdmin]);

	const handleClose = () => {
		setShowModal(false);
		setShowAdminModal(false);
	};

	const toggleAdminPrivilege = async () => {
		setShowAdminModal(false);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: makeUserAdmin._id,
				admin: makeUserAdmin.admin,
			}),
		};
		const result = await (
			await fetch("/adminToggleAdminPrivilege", requestOptions)
		).json();
		if (result.response) {
			//finally resetting to normal
			setUsers(
				users.map((user) => {
					if (user.phone === Customer.phone) {
						let temp = { ...Customer, admin: makeUserAdmin.admin };
						return temp;
					}
					return user;
				})
			);
			history.go();
		} else if (result.error === "Not logged in") {
			setShowModal(true);
		} else {
			alert("DataBase Error occurred!!");
		}
	};

	const showAdminUsers = () => {
		let adminUser = users.filter((user) => user.admin);
		setSelectedUsers(adminUser);
	};
	const showNormalUsers = () => {
		let normalUser = users.filter((user) => !user.admin);
		setSelectedUsers(normalUser);
	};
	const showAllUsers = () => {
		setSelectedUsers(users);
	};

	const handleFilter = () => {
		setValue(0);
		if (search === "") {
			setSelectedUsers(users);
			return;
		}
		let filteredList = users.filter(
			(user) =>
				search === user.name.firstName ||
				search === user.name.lastName ||
				search === `${user.name.firstName} ${user.name.lastName}` ||
				search === user._id ||
				search === user.phone ||
				search === user.email ||
				search === user.address
		);
		if (filteredList.length < 1) {
			alert("No result found!");
			return;
		}
		setSelectedUsers(filteredList);
	};
	return (
		<>
			<div className="adminPanel">
				{/* TOGGLE ADMIN PERMISSION */}
				<Modal show={showAdminModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Are you Sure?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Do you want to {makeUserAdmin.admin ? "Give" : "Revoke"} the user{" "}
						{makeUserAdmin.admin ? null : "from"} admin privileges?
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="warning"
							onClick={() => {
								handleClose();
								toggleAdminPrivilege();
							}}
						>
							Yes
						</Button>
						<Button variant="primary" onClick={handleClose}>
							No
						</Button>
					</Modal.Footer>
				</Modal>
				{/* SESSION TIMEOUT */}
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
				<EditCustomer
					Customer={Customer}
					setCustomer={setCustomer}
					edit={edit}
					setEdit={setEdit}
					users={users}
					setUsers={setUsers}
					setShowModal={setShowModal}
				/>
				<h1>Users</h1>
				<nav style={{ top: "4.1rem" }} className="sticky-top">
					<Paper className={classes.tabRoot}>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							centered
						>
							<Tab onClick={showAllUsers} label="All Users" />
							<Tab onClick={showNormalUsers} label="Customers" />
							<Tab onClick={showAdminUsers} label="Admin Users" />
						</Tabs>
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
								<th style={{top:"7.25rem"}} className="sticky-top">
									<h4>
										<strong>Customer Name</strong>
									</h4>
								</th>
								<th style={{top:"7.25rem"}} className="sticky-top">
									<h4>
										<strong>Customer ID</strong>
									</h4>
								</th>
								<th style={{top:"7.25rem"}} className="sticky-top">
									<h4>
										<strong>Customer Phone</strong>
									</h4>
								</th>
								<th style={{top:"7.25rem"}} className="sticky-top"></th>
								<th style={{top:"7.25rem"}} className="sticky-top"></th>
							</tr>
						</thead>
						<tbody>
							{selectedUsers.map((user, index) => {
								return (
									<tr>
										<td>
											<h5>
												{user.name.firstName} {user.name.lastName}
											</h5>
										</td>
										<td>
											<h5 className="m-2"> {user._id}</h5>
										</td>
										<td>
											<h5 className="m-2"> {user.phone}</h5>
										</td>
										<td>
											<button
												className={`btn btn-${
													user.admin ? "danger" : "warning"
												} float-right mr-3 shadow`}
												onClick={() => {
													setMakeUserAdmin({
														_id: user._id,
														admin: !user.admin,
													});
													setShowAdminModal(true);
												}}
											>
												{user.admin ? "Revoke admin" : "Make Admin"}
											</button>
										</td>
										<td>
											<button
												className="btn btn-primary float-right mr-3 shadow"
												onClick={() => {
													setCustomer({
														_id: user._id,
														firstName: user.name.firstName,
														lastName: user.name.lastName,
														phone: user.phone,
														address: user.address,
														email: user.email,
													});
													setEdit(true);
												}}
											>
												Edit
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</main>
			</div>
		</>
	);
};

export default Users;

/***********************************************************OLD CODE******************************************************* */
/*
{users.map((user, index) => {
  return (
    <div className="user-form effect3D effect3D-users" key={index}>
      {user.phone === edit ? (
        <span className="edituser" onClick={handleUpdate}>
          UPDATE
        </span>
      ) : (
        <span
          className="edituser"
          onClick={() => {
            toggleEdit(user);
          }}
        >
          EDIT
        </span>
      )}
      <div>
        <label>Id: </label>
        <span>{user._id}</span>
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={
            user.phone === edit
              ? userDetails.name.firstName
              : user.name.firstName
          }
          onChange={(e) => {
            let changedUserDetails = {
              ...userDetails,
              name: {
                ...userDetails.name,
                firstName: e.target.value,
              },
            };
            setUserDetails(changedUserDetails);
          }}
          disabled={user.phone === edit ? false : true}
        />
        <input
          type="text"
          value={
            user.phone === edit
              ? userDetails.name.lastName
              : user.name.lastName
          }
          onChange={(e) => {
            let changedUserDetails = {
              ...userDetails,
              name: { ...userDetails.name, lastName: e.target.value },
            };
            setUserDetails(changedUserDetails);
          }}
          disabled={user.phone === edit ? false : true}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={user.phone === edit ? userDetails.phone : user.phone}
          onChange={(e) => {
            let changedUserDetails = {
              ...userDetails,
              phone: e.target.value,
            };
            setUserDetails(changedUserDetails);
          }}
          disabled={user.phone === edit ? false : true}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={user.phone === edit ? userDetails.email : user.email}
          onChange={(e) => {
            let changedUserDetails = {
              ...userDetails,
              email: e.target.value,
            };
            setUserDetails(changedUserDetails);
          }}
          disabled={user.phone === edit ? false : true}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={
            user.phone === edit ? userDetails.address : user.address
          }
          onChange={(e) => {
            let changedUserDetails = {
              ...userDetails,
              address: e.target.value,
            };
            setUserDetails(changedUserDetails);
          }}
          disabled={user.phone === edit ? false : true}
        />
      </div>
    </div>
  );
})}
*/
