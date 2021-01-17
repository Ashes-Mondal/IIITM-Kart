import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
// import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
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
	const history = useHistory();
	const handleClose = () => {
		setEdit(false);
	};
	const handleEdit = async () => {
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
			console.log("tempUsers",tempUsers);
			setUsers(tempUsers);
			console.log("users",users);
			history.go();
		} else if (result.error === "Not logged in") {
			setShowModal(true);
		} else {
			alert("DataBase Error occurred!!");
		}
	};
	return (
		<div>
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
						<Button autoFocus color="inherit" onClick={handleEdit}>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<List>
					<ListItem>
						<TextField
							autoFocus
							margin="dense"
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
							autoFocus
							margin="dense"
							id="firstName"
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
							autoFocus
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
							autoFocus
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
							autoFocus
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
	const history = useHistory();
	const { setIsAuth } = useContext(Authentication);
	const [users, setUsers] = useState([]);
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
	};

	const toggleAdminPrivilege = async (id, privilege) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: id,
				admin: privilege,
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
						let temp = { ...Customer, admin: privilege };
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
	return (
		<>
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
				<main>
					<table>
						<tbody>
							<tr>
								<th>
									<h4>
										<strong>Customer Name</strong>
									</h4>
								</th>
								<th>
									<h4>
										<strong>Customer ID</strong>
									</h4>
								</th>
								<th>
									<h4>
										<strong>Customer Phone</strong>
									</h4>
								</th>
								<th></th>
								<th></th>
							</tr>
						</tbody>
						{users.map((user, index) => {
							return (
								<tbody key={index}>
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
												className={`btn btn-${user.admin?"danger":"warning"} float-right mr-3 shadow`}
												onClick={() => {toggleAdminPrivilege(user._id,!user.admin)}}
											>
												{user.admin?"Revoke admin":"Make Admin"}
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
								</tbody>
							);
						})}
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
