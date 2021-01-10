import React, { useEffect, useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Components/pages/HomePage";
import Navbar from "./Components/Navbar";
import UserDetails from "./Components/pages/UserDetails";
import ShoppingCart from "./Components/pages/ShoppingCart";
import Error from "./Components/pages/Error";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/pages/Login";
import Signup from "./Components/pages/Signup";
import Dashboard from "./Components/pages/admin/Dashboard";
import Orders from "./Components/pages/admin/Orders";
import Users from "./Components/pages/admin/Users";
import SideNavBar from "./Components/pages/admin/SideNavBar";
import Items from "./Components/pages/admin/Items";
import AddItem from "./Components/pages/admin/AddItem";
import EditItem from "./Components/pages/admin/EditItem";
import Loader from "react-loader-spinner";

//creating User and Authentication context
const User = createContext();
const Item = createContext();
const Authentication = createContext();

const App = () => {
  const [itemList, setItemList] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    name: { firstName: "", lastName: "" },
    email: "",
    phone: "",
    userCart: [],
    orders: [],
  });
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState(false);
  //side effect when page first time rendered
  useEffect(() => {
    const fetchItems_fetchUser = async () => {
      //fetching user data from the server side if any
      const result = await (await fetch("/getUserDetails")).json();
      console.log("RESULT", result);
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
      // dispatch({ type: "setItemList", payload: listOfItems });
      setItemList(listOfItems || []);
      setLoaded(true);
    };
    fetchItems_fetchUser();
  }, [admin]);

  const Admin = () => {
    const { path } = useRouteMatch();

    return (
      <>
        <Switch>
          <Route exact path={`${path}/`}>
            <SideNavBar />
            <Dashboard user={user} setAdmin={setAdmin} s />
          </Route>
          <Route path={`${path}/users`}>
            <SideNavBar />
            <Users setCart={setCart} setAdmin={setAdmin} />
          </Route>
          <Route path={`${path}/items`}>
            <SideNavBar />
            <Items itemList={itemList} setItemList={setItemList} />
          </Route>
          <Route path={`${path}/orders`}>
            <SideNavBar />
            <Orders setAdmin={setAdmin} setCart={setCart} />
          </Route>
          <Route path={`${path}/addItem`}>
            <SideNavBar />
            <AddItem setLoaded={setLoaded} />
          </Route>
          <Route path={`${path}/editItem/:itemId`}>
            <SideNavBar />
            <EditItem
              itemList={itemList}
              setItemList={setItemList}
              setLoaded={setLoaded}
            />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </>
    );
  };

  return (
    <Router>
      <Item.Provider value={{ setItemList: setItemList, itemList: itemList }}>
        <User.Provider value={{ user: user, setUser: setUser }}>
          <Authentication.Provider
            value={{ isAuth: isAuth, setIsAuth: setIsAuth }}
          >
            <Navbar user={user} cart={cart} admin={admin} />
            {loaded === false ? (
              <div>
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
                  <HomePage
                    itemList={itemList}
                    cart={cart}
                    setCart={setCart}
                    setItemList={setItemList}
                  />
                </Route>
                <Route exact path="/cart">
                  <ShoppingCart
                    cart={cart}
                    setCart={setCart}
                    user={user}
                    setUser={setUser}
                  />
                </Route>
                {isAuth ? (
                  <Route exact path="/user">
                    <UserDetails
                      user={user}
                      setUser={setUser}
                      setLoaded={setLoaded}
                    />
                  </Route>
                ) : null}
                {isAuth ? null : (
                  <Route exact path="/login">
                    <Login setLoaded={setLoaded} />
                  </Route>
                )}
                {isAuth ? null : (
                  <Route exact path="/signup">
                    <Signup setLoaded={setLoaded} />
                  </Route>
                )}
                {admin ? (
                  <Route path="/admin">
                    <Admin />
                  </Route>
                ) : null}
                <Route path="*">
                  <Error />
                </Route>
              </Switch>
            )}
          </Authentication.Provider>
        </User.Provider>
      </Item.Provider>
    </Router>
  );
};

export default App;
export { User, Authentication, Item };
