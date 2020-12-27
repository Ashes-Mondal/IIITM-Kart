import React, { useReducer, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import UserDetails from "./Components/UserDetails";
import ShoppingCart from "./Components/ShoppingCart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

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

  //side effect when page first time rendered
  useEffect(() => {
    const URL = "/fetchItems";

    const fetchJSON_fromServer = async () => {
      const itemList = await (await fetch(URL)).json();
      dispatch({ type: "fetchedItemJson", payload: itemList });
    };
    fetchJSON_fromServer();
  }, []);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage itemList={itemList} />
        </Route>

        <Route exact path="/user">
          <UserDetails />
        </Route>

        <Route exact path="/cart">
          <ShoppingCart />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
