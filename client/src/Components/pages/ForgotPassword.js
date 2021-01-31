import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const [showProcessing, setShowProcessing] = useState(false);
  const [open, setOpen] = useState(true);
  const [openOtp, setOpenOtp] = useState(false);
  const [openResetPwd, setOpenResetPwd] = useState(false);
  const [password, setPassword] = useState("");
  const [userId, setuserId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const emailValidation = async () => {
    setShowProcessing(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    };
    const result = await (
      await fetch("/emailValidation", requestOptions)
    ).json();
    // console.log("resultFP:", result);
    if (result.response) {
      setOpenOtp(true);
      setOtp(result.otp);
      setuserId(result.userId);
      handleClose();
    } else {
      alert("This email is not registered!");
    }
    setShowProcessing(false);
  };

  const handleOtp = (e) => {
    e.preventDefault();
    setShowProcessing(true);
    if (otp === inputOtp) {
      setOpenResetPwd(true);
      setOpenOtp(false);
    } else {
      alert("Invalid OTP!");
    }
    setShowProcessing(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setShowProcessing(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        password: password,
      }),
    };
    const result = await (await fetch("/resetPassword", requestOptions)).json();
    if (result.response) {
      history.push("/login");
    } else {
      alert("Could not reset.");
    }
    setShowProcessing(false);
  };

  if (open === false && openOtp === false && openResetPwd === false) {
    history.push("/login");
  }
  return (
    <>
      {showProcessing ? <LinearProgress color="secondary" /> : null}
      {openOtp ? (
        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Verify OTP
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
        </div>
      ) : null}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter Email:</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Enter your registered email:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                emailValidation();
              }}
              color="primary"
            >
              Send OTP
            </Button>
            <Button
              onClick={() => {
                history.push("/login");
              }}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {openResetPwd ? (
        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset Password
              </Typography>
              <form className={classes.form} onSubmit={handleResetPassword}>
                <TextField
                  variant="outlined"
                  type="password"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Reset Password
                </Button>
              </form>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
};

export default ForgotPassword;
