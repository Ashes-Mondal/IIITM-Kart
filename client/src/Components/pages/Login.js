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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login({ setLoaded }) {
	const [error, setError] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		//POSTING THE FORM
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ password: password, phone: phone }),
		};
		const result = await (await fetch("/login", requestOptions)).json();
		if (result.response) {
			setLoaded(false);
			history.push("/");
			history.go();
		} else {
			setError(result.error);
		}
	};
	const classes = useStyles();

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
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} >
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="phone"
						label="Phone"
						name="phone"
						autoComplete="phone"
						autoFocus
						value={phone}
						onChange={(e) => {
							setPhone(e.target.value);
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}





/************************************************************** OLD CODE ********************************************************************
/*
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Login({ setLoaded }) {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //POSTING THE FORM
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password, phone: phone }),
    };
    const result = await (await fetch("/login", requestOptions)).json();
    if (result.response) {
      setLoaded(false);
      history.push("/");
      history.go();
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
      {error !== "" ? (
        <Alert variant="danger">
          <Alert.Heading>
            <h5 style={{ textAlign: "center" }}>{error}</h5>
          </Alert.Heading>
        </Alert>
      ) : null}

      <form className="box mt-5">
        <h1>Login</h1>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>LogIn</button>
        Not registered yet? <Link to="/signup">SignUp</Link>.
      </form>
    </div>
  );
}

export default Login;
*********************************************************************************************************************/