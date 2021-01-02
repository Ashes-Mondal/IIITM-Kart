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
  //side effect when page first time rendered
  useEffect(() => {
    const URL = "/fetchItems";

    const fetchItems_fetchUser = async () => {
      //fetching item list from the server side
      const listOfItems = await (await fetch(URL)).json();
      //setting the itemList state
      dispatch({ type: "setItemList", payload: listOfItems });
      //fetching user data from the server side
      const userData = await (await fetch("/getUserDetails")).json();
      console.log("userData:", userData);
      //if response is true then user is logged in
      if (userData.response !== false) {
        //accordingly setting the states
        setIsAuth(true);
        setUser(userData);
        setCart(userData.userCart);
      }
    };
    fetchItems_fetchUser();
  }, []);

  return (
    <Router>
      <Item.Provider value={{ setItemList: dispatch }}>
        <User.Provider value={{ user: user, setUser: setUser }}>
          <Authentication.Provider
            value={{ isAuth: isAuth, setIsAuth: setIsAuth }}
          >
            <Navbar cart={cart} />
            <Switch>
              <Route exact path="/">
                <HomePage itemList={itemList} cart={cart} setCart={setCart} />
              </Route>

<<<<<<< HEAD
              <Route exact path="/user">
                <UserDetails user={user} setUser={setUser} />
              </Route>
=======
            <Route exact path="/user">
              <UserDetails user={user} setUser={setUser} />
            </Route>
>>>>>>> 96e7e863e5679a08c81e40b59e8ead0e335b4dc9

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
      </Item.Provider>
    </Router>
  );
};

export default App;
export { User, Authentication, Item };
