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
import Admin from "./Components/pages/Admin";

//creating User and Authentication context
const User = createContext();
const Item = createContext();
const Authentication = createContext();
//item reducer function
const reducer = (currState, action) => {
  switch (action.type) {
    case "setItemList":
      console.log("dispatch-ItemData", action.payload);
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
  const [admin, setAdmin] = useState(false);
  //side effect when page first time rendered
  useEffect(() => {
    const fetchItems_fetchUser = async () => {
      //fetching user data from the server side if any
      const userData = await (await fetch("/getUserDetails")).json();
      console.log("userData:", userData);
      //if the user is admin setAdmin(true)
      if (userData.admin === true) {
        setAdmin(true);
      }
      //if response is true then user is logged in
      if (userData.response !== false) {
        //accordingly setting the states
        setIsAuth(true);
        setUser(userData);
        setCart(userData.userCart);
      }
      //fetching item list from the server side and setting in itemList state
      const listOfItems = await (await fetch("/fetchItems")).json();
      dispatch({ type: "setItemList", payload: listOfItems });
    };
    fetchItems_fetchUser();
  }, [admin]);

  const adminComponents = () => {
    return (
      <>
        <Route exact path="/admin">
          <Admin />
        </Route>
      </>
    );
  };
  const userComponents = () => {
    return (
      <>
        <Navbar user={user} cart={cart} admin={admin} />
        <Switch>
          <Route exact path="/">
            <HomePage itemList={itemList} cart={cart} setCart={setCart} />
          </Route>
          <Route exact path="/user">
            <UserDetails user={user} setUser={setUser} setCart={setCart} />
          </Route>
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
