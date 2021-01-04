import React, { useState, useEffect, useContext } from "react";
import SearchBox from "./SearchBox";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Drawer, Link, MenuItem } from "@material-ui/core";
import { Authentication } from "../App";
//css for the drawer
const useStyles = makeStyles({
  root: {
    fontSize: "2rem",
    justifyContent: "center",
  },
  MuiDrawer_paper: {
    width: "30%",
    justifyContent: "center",
  },
});
function Navbar({ cart, admin }) {
  const { isAuth } = useContext(Authentication);
  /****************************** hamburger Drawer Starts here********************************************/
  //usestyles
  const classes = useStyles();
  //mobile display state = {}
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  //destructuring the state
  const { mobileView, drawerOpen } = state;
  //when in desktop size
  const displayDesktop = () => {
    //USER-LOGOUT render
    const user_logout_render = () => {
      return (
        <>
          <NavLink
            className="navlink"
            activeClassName="active-nav-link"
            exact
            to="/user"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
            <span className="m-3">User</span>
          </NavLink>
          {admin ? (
            <NavLink
              className="navlink"
              activeClassName="active-nav-link"
              exact
              to="/admin"
            >
              <span className="m-3">Admin</span>
            </NavLink>
          ) : null}
          <form className="navlink" method="POST" action="/logout">
            <button className="btn btn-danger">Logout</button>
          </form>
        </>
      );
    };
    //LOGIN-SIGNUP render
    const login_signup_render = () => {
      return (
        <>
          <NavLink
            className="navlink"
            activeClassName="active-nav-link"
            exact
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className="navlink"
            activeClassName="active-nav-link"
            exact
            to="/signup"
          >
            SignUp
          </NavLink>
        </>
      );
    };

    return (
      <>
        <NavLink
          className="navlink"
          activeClassName="active-nav-link"
          exact
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-house-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path
              fillRule="evenodd"
              d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />
          </svg>
          <span className="m-3">Home</span>
        </NavLink>
        <NavLink
          className="navlink"
          activeClassName="active-nav-link "
          exact
          to="/cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <span className="m-3">Cart</span>
        </NavLink>
        {isAuth ? user_logout_render() : login_signup_render()}
      </>
    );
  };
  //when in mobile size
  const displayMobile = () => {
    //functions to handle states
    const handleDrawerOpen = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    };
    const handleDrawerClose = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    };
    //Menu data and links
    const headersData = admin
      ? [
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "User", href: "/user" },
          { label: "Admin", href: "/admin" },
        ]
      : isAuth
      ? [
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "User", href: "/user" },
        ]
      : [
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Login", href: "/login" },
          { label: "Signup", href: "/signup" },
        ];
    const getDrawerChoices = () => {
      return headersData.map(({ label, href }) => {
        return (
          <div>
            <Link
              {...{
                component: NavLink,
                to: href,
                color: "inherit",
                style: { textDecoration: "none" },
                key: label,
              }}
            >
              <MenuItem className={classes.root}>{label}</MenuItem>
            </Link>
          </div>
        );
      });
    };
    return (
      <div className="menu-icon">
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon style={{ fontSize: 40, color: "white" }} />
        </IconButton>
        <Drawer
          {...{
            anchor: "right",
            classes: { paper: classes.MuiDrawer_paper },
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className="menu-choices">{getDrawerChoices()}</div>
          {isAuth ? (
            <form className="" method="POST" action="/logout">
              <button className="btn btn-danger drawer-logout">Logout</button>
            </form>
          ) : null}
        </Drawer>
      </div>
    );
  };
  /************************************ hamburger Drawer Ends here **********************************/
  //side-effect
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  return (
    <nav className="navbar sticky-top">
      <div className="site-name">
        <span className="text1">IIITM-Kart</span>
        <span className="text2">A Shopping site for IIITM students</span>
      </div>
      <div className="search-box">
        <SearchBox />
      </div>
      <div className="navlink-container">
        {mobileView ? displayMobile() : displayDesktop()}
      </div>
    </nav>
  );
}

export default Navbar;
