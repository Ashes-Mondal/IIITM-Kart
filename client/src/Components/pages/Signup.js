import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        IIITM Kart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ setLoaded }) {
  const classes = useStyles();
  const history = useHistory();
  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    //POSTING THE FORM
    if (signup.confirmPassword !==signup.password) {
      alert("Passwords are not matched...");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: signup.password,
          firstName: signup.firstName,
          lastName: signup.lastName,
          address: signup.address,
          phone: signup.phone,
          email: signup.email,
        }),
      };
      const result = await (await fetch("/signup", requestOptions)).json();
      if (result.response) {
        setLoaded(false);
        history.push("/login");
        history.go();
      } else if(result.error._message === undefined){
        setError(result.error);
      }else{
        setError(result.error._message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {error !== "" ? (
        <Alert variant="danger">
          <Alert.Heading>
            <h5 style={{ textAlign: "center" }}>{error}</h5>
          </Alert.Heading>
        </Alert>
      ) : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={signup.firstName}
                onChange={(e) => {
                  setSignup({ ...signup, firstName: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={signup.lastName}
                onChange={(e) => {
                  setSignup({ ...signup, lastName: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={signup.email}
                onChange={(e) => {
                  setSignup({ ...signup, email: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="phone"
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                value={signup.phone}
                onChange={(e) => {
                  setSignup({ ...signup, phone: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="address"
                name="address"
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                value={signup.address}
                onChange={(e) => {
                  setSignup({ ...signup, address: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signup.password}
                onChange={(e) => {
                  setSignup({ ...signup, password: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={signup.confirmPassword}
                onChange={(e) => {
                  setSignup({ ...signup, confirmPassword: e.target.value });
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

/*************************************************************OLD CODE ****************************************************** */
/*
import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Signup({setLoaded}) {
  const history = useHistory();
  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "" ,
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");

const handleSignUp = async(e)=>{
  e.preventDefault();
    //POSTING THE FORM
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: signup.password,
        firstName: signup.firstName,
        lastName: signup.lastName,
        address: signup.address,
        phone: signup.phone,
        email: signup.email
      }),
    };
    const result = await (await fetch("/signup", requestOptions)).json();
    if (result.response) {
      setLoaded(false);
      history.push("/login");
      history.go();
    } else {
      console.log ("SUP_result",result)
      setError(result.error._message);
    }
}
  return (
    <div>
      {error !== "" ? (
        <Alert variant="danger">
          <Alert.Heading>
            <h5 style={{ textAlign: "center" }}>{error}</h5>
          </Alert.Heading>
        </Alert>
      ) : null}
      <form className="box box-signup mt-5">
        <h1>Sign Up</h1>
        <div className="row field">
          <div className="col-6">
            <input

              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={signup.firstName}
              onChange={(e) => {
                setSignup({ ...signup, firstName: e.target.value });
              }}
            />
            <label className="signupLabel" htmlFor="mobile">
              First Name
            </label>
          </div>

          <div className="col-6">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={signup.lastName}
              onChange={(e) => {
                setSignup({ ...signup, lastName: e.target.value });
              }}
            />
            <label className="signupLabel" htmlFor="mobile">
              Last Name
            </label>
          </div>
        </div>
        <div className="row field">
          <div className="col-6">
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              value={signup.email}
              onChange={(e) => {
                setSignup({ ...signup, email: e.target.value });
              }}
            />
            <label className="signupLabel" htmlFor="email">
              Email
            </label>
          </div>

          <div className="col-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={signup.password}
              onChange={(e) => {
                setSignup({ ...signup, password: e.target.value });
              }}
            />
            <label className="signupLabel" htmlFor="password">
              Password
            </label>
          </div>
        </div>
        <div className="row field">
          <div className="col-6">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              value={signup.phone}
              onChange={(e) => {
                setSignup({ ...signup, phone: e.target.value });
              }}
            />
            <label className="signupLabel" htmlFor="mobile">
              Phone
            </label>
          </div>

          <div className="col-6">
            <input
              type="text"
              name="address"
              placeholder="address"
              required
              value={signup.address}
              onChange={(e) => {
                setSignup({ ...signup, address: e.target.value });
              }}
            />
            <label className="signupLabel" htmlFor="address">
              address
            </label>
          </div>
        </div>
        <button onClick={handleSignUp}>Signup</button>
        Already registered? <Link to="/login">Login</Link>.
      </form>
    </div>
  );
}

export default Signup;
*/
