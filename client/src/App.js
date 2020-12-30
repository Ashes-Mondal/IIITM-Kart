import React, { useReducer, useEffect, useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import UserDetails from "./Components/UserDetails";
import ShoppingCart from "./Components/ShoppingCart";
import Error from "./Components/Error";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

//creating User and Authentication context
const User = createContext();
const Authentication = createContext();
//item reducer function
const reducer = (currState, action) => {
  switch (action.type) {
    case "fetchedItemJson":
      console.log("dispatch-ItemData", action.payload);
      return action.payload;
    default:
      return currState;
  }
};
const App = () => {
  const [itemList, dispatch] = useReducer(reducer, []);
  let [cart, setCart] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  //side effect when page first time rendered
  useEffect(() => {
    const URL = "/fetchItems";

    const fetchJSON_fromServer = async () => {
      const itemList = await (await fetch(URL)).json();
      dispatch({ type: "fetchedItemJson", payload: itemList });
      const userData = await (await fetch("/getUserDetails")).json();
      console.log("userData:", userData);
      if (userData.response !== false) {
        setIsAuth(true);
        setUser(userData);
        setCart(userData.userCart);
      }
    };
    fetchJSON_fromServer();
  }, []);

  return (
    <Router>
      <User.Provider value={{ user: user, setUser: setUser }}>
        <Authentication.Provider
          value={{ isAuth: isAuth, setIsAuth: setIsAuth }}
        >
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage itemList={itemList} cart={cart} setCart={setCart} />
            </Route>

            <Route exact path="/user">
              <UserDetails />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>

            <Route exact path="/cart">
              <ShoppingCart cart={cart} setCart={setCart} />
            </Route>

            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Authentication.Provider>
      </User.Provider>
    </Router>
  );
};

export default App;
export { User, Authentication };
