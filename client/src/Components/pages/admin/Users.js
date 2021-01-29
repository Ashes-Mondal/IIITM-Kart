import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from "material-ui-search-bar";
import ScrollTop from "../ScrollTop"

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
  table: {
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
      // console.log("tempUsers", tempUsers);
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
  const [showSearchBar, setShowSearchBar] = useState(true);
  //side-effect
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
    const setResponsiveness = () => {
      if (window.innerWidth < 580) return setShowSearchBar(false);
      else return setShowSearchBar(true);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return function cleanup() {
      window.removeEventListener("resize", () => setResponsiveness());
    };
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
		const filterSearch = (itemList, Search) => {
			for (let wordIndex = 1; wordIndex < Search.length; wordIndex++) {
				if (wordIndex === 0) continue;
				itemList = itemList.filter((itemObject) => {
					let flag = false;
					let findResult = new RegExp(Search[wordIndex], "ig");

					//testing on firstName
					flag = findResult.test(itemObject.name.firstName);
					if (flag) return itemObject;
					//testing on lastName
					flag = findResult.test(itemObject.name.lastName);
					if (flag) return itemObject;
					//testing on phone
					flag = findResult.test(itemObject.phone);
					if (flag) return itemObject;
					//testing on email
					flag = findResult.test(itemObject.email);
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
		for (let i = 0; i < users.length; i++) {
			//razorPay Orderid
			if (search === users[i]._id) {
				combinedResult.push(users[i]);
				continue;
			}
			// customer Name
			if (regex.test(users[i].name.firstName)) {
				combinedResult.push(users[i]);
				continue;
			}
			if (regex.test(users[i].name.lastName)) {
				combinedResult.push(users[i]);
				continue;
			}
			//phone
			if (regex.test(users[i].phone)) {
				combinedResult.push(users[i]);
				continue;
			}
			//email
			if (regex.test(users[i].email)) {
				combinedResult.push(users[i]);
				continue;
			}
		}
		//filtering based on further words in search string
		let itemList = combinedResult;
		if (Search.length > 1 && itemList.length)
			itemList = filterSearch(itemList, Search);
		if (itemList.length) setSelectedUsers(itemList);
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
      <ScrollTop showBelow={400}/>
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
      {/* SESSION TIMEOUT  */}
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
              onClick={showAllUsers}
              label="All Users"
            />
            <Tab
              style={{ flex: "1 1 auto" }}
              onClick={showNormalUsers}
              label="Customers"
            />
            <Tab
              style={{ flex: "1 1 auto" }}
              onClick={showAdminUsers}
              label="Admin Users"
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
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ fontSize: "1rem" }}>
                User Id
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                Customer Name
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                Email
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                Contact Number
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                Admin privilege
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "1rem" }} align="center">
                Update
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedUsers.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {user._id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.name.firstName} {user.name.lastName}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.phone}</StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    className={`btn btn-sm btn-${
                      user.admin ? "danger" : "warning"
                    } shadow`}
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
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    className="btn btn-sm btn-primary shadow"
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
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
