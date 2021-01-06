import React, { useReducer, useEffect, useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Components/pages/HomePage";
import Navbar from "./Components/Navbar";
import UserDetails from "./Components/pages/UserDetails";
import ShoppingCart from "./Components/pages/ShoppingCart";
import Error from "./Components/pages/Error";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/pages/Login";
import Signup from "./Components/pages/Signup";
import Dashboard from "./Components/pages/admin/Dashboard";
import Orders from "./Components/pages/admin/Orders";
import Users from "./Components/pages/admin/Users";
import SideNavBar from "./Components/pages/admin/SideNavBar";
import Items from "./Components/pages/admin/Items";
import Loader from "react-loader-spinner";

//creating User and Authentication context
const User = createContext();
const Item = createContext();
const Authentication = createContext();

//item reducer function
const reducer = (currState, action) => {
  switch (action.type) {
    case "setItemList":
      return action.payload;
    default:
      return currState;
  }
};
const App = () => {
  const [itemList, dispatch] = useReducer(reducer, []);
  const [cart, setCart] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    name: { firstName: "", lastName: "" },
    email: "",
    phone: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState(false);
  //side effect when page first time rendered
  useEffect(() => {
    const fetchItems_fetchUser = async () => {
      //fetching user data from the server side if any
      const result = await (await fetch("/getUserDetails")).json();
      console.log("result:", result);
      //if response is true then user is logged in
      if (result.response === true || result.error === "Not logged in") {
        setLoaded(true);
      }
      //if response is true then user is logged in
      if (result.response === true) {
        //accordingly setting the states
        setAdmin(result.userDetails.admin);
        setIsAuth(true);
        setUser(result.userDetails);
        setCart(result.userDetails.userCart);
      }
      //fetching item list from the server side and setting in itemList state
      const listOfItems = await (await fetch("/fetchItems")).json();
      console.log("listOfItems", listOfItems);
      dispatch({ type: "setItemList", payload: listOfItems });
    };
    fetchItems_fetchUser();
  }, [admin]);

  const adminComponents = () => {
    return (
      <>
        <div className="flex-container p-0">
          <SideNavBar />

          <Switch>
            <Route exact path="/admin">
              <Dashboard admin={user} />
            </Route>
            <Route exact path="/admin/items">
              <Items itemList={itemList} />
            </Route>
            <Route exact path="/admin/orders">
              <Orders />
            </Route>
            <Route exact path="/admin/users">
              <Users />
            </Route>
          </Switch>
        </div>
      </>
    );
  };
  const userComponents = () => {
    return (
      <>
        <Navbar user={user} cart={cart} admin={admin} />
        {loaded === false ? (
          <div className="container">
            <Loader
              className="tc"
              type="ThreeDots"
              color="#2BAD60"
              height="200"
              width="200"
            />
          </div>
        ) : (
          <Switch>
            <Route exact path="/">
              <HomePage itemList={itemList} cart={cart} setCart={setCart} />
            </Route>
            {isAuth ? (
              <Route exact path="/user">
                <UserDetails user={user} setUser={setUser} setCart={setCart} />
              </Route>
            ) : null}
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/cart">
              <ShoppingCart
                cart={cart}
                setCart={setCart}
                user={user}
                setUser={setUser}
              />
            </Route>
            {admin ? adminComponents() : null}
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        )}
      </>
    );
  };

  return (
    <Router>
      <Item.Provider value={{ setItemList: dispatch, itemList: itemList }}>
        <User.Provider value={{ user: user, setUser: setUser }}>
          <Authentication.Provider
            value={{ isAuth: isAuth, setIsAuth: setIsAuth }}
          >
            {userComponents()}
          </Authentication.Provider>
        </User.Provider>
      </Item.Provider>
    </Router>
  );
};

export default App;
export { User, Authentication, Item };
