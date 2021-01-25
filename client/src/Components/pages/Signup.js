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
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    //margin: theme.spacing(1),
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

//OtpPage
const OtpPage = ({
  setInputOtp,
  inputOtp,
  setOpenOtp,
  otp,
  handleSignUp,
  setError,
}) => {
  const handleOtp = async (e) => {
    e.preventDefault();
    if (inputOtp === otp) {
      await handleSignUp();
      setOpenOtp(false);
    } else {
      setError("OTP did not match!");
    }
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify OTP
          <br />
          <h6>(OTP has been sent to your registered email-id)</h6>
        </Typography>
        <form className={classes.form} onSubmit={handleOtp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="OTP"
            label="OTP"
            name="OTP"
            autoComplete="OTP"
            autoFocus
            onChange={(e) => setInputOtp(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Verify
          </Button>
        </form>
      </div>
    </Container>
  );
};
//SignUp form component
const SignUpPage = ({ signup, setSignup, handleEmailVerification }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleEmailVerification}>
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
};

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

export default function SignUp({ setLoaded }) {
  const history = useHistory();
  const [openOtp, setOpenOtp] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
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

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setError("");
    setShowProcessing(true);
    if (signup.confirmPassword !== signup.password) {
      setError("Passwords not matched...");
    } else {
      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: signup.firstName,
          lastName: signup.lastName,
          phone: signup.phone,
          email: signup.email,
        }),
      };
      let result = await (
        await fetch("/signupEmailValidation", requestOptions)
      ).json();
      if (result.response === false) {
        setError(result.error);
        setSignup({
          ...signup,
          email: "",
          password: "",
          phone: "",
          confirmPassword: "",
        });
        setShowProcessing(false);
        return;
      }
      setOtp(result.otp);
      setOpenOtp(true);
    }
    setShowProcessing(false);
  };

  const handleSignUp = async () => {
    setError("");
    setShowProcessing(true);

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
      setLoaded(true);
      // history.go();
    } else if (result.error._message === undefined) {
      setError(result.error);
    } else {
      setError(result.error._message);
    }
    setShowProcessing(false);
  };

  return (
    <div>
      {showProcessing ? <LinearProgress color="secondary" /> : null}
      {error !== "" ? (
        <Alert variant="danger">
          <Alert.Heading>
            <h5 style={{ textAlign: "center" }}>{error}</h5>
          </Alert.Heading>
        </Alert>
      ) : null}
      {openOtp ? (
        <OtpPage
          setOpenOtp={setOpenOtp}
          setInputOtp={setInputOtp}
          otp={otp}
          inputOtp={inputOtp}
          handleSignUp={handleSignUp}
          setError={setError}
          setShowProcessing={setShowProcessing}
        />
      ) : (
        <SignUpPage
          signup={signup}
          setSignup={setSignup}
          setOpenOtp={setOpenOtp}
          handleEmailVerification={handleEmailVerification}
          setShowProcessing={setShowProcessing}
        />
      )}
    </div>
  );
}
