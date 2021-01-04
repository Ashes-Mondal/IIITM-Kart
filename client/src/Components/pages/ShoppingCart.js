import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Authentication } from "../../App";

function ShoppingCart({ cart, setCart, user, setUser }) {
  const { setIsAuth } = useContext(Authentication);
  const history = useHistory();
  const getTotalSum = () => {
    return cart.reduce((sum, { item, Qty }) => sum + item.cost * Qty, 0);
  };

  //clears the cart
  const clearCart = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    const result = await (await fetch("/clearCart", requestOptions)).json();
    console.log("result:", result);
    if (result.response) {
      setCart([]);
    } else {
      alert("Could not clear the cart!");
      setIsAuth(false);
      setCart([]);
      history.push("/login");
    }
  };
  // increase qty of item by 1
  const plusItemQuantity = async (Product) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: Product.item._id,
        itemQty: Product.Qty + 1,
      }),
    };
    const result = await (await fetch("/updateQty", requestOptions)).json();
    console.log("response:", result.response);
    if (result.response) {
      const tempCart = cart.map((product) => {
        if (product.item._id === Product.item._id) {
          product.Qty = product.Qty + 1;
        }
        return product;
      });
      setCart(tempCart);
    } else {
      alert("Could not increase the Qty!");
      setIsAuth(false);
      setCart([]);
      history.push("/login");
    }
  };

  // decrease qty of item
  const minusItemQuantity = async (Product) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: Product.item._id,
        itemQty: Product.Qty - 1,
      }),
    };
    const result = await (await fetch("/updateQty", requestOptions)).json();
    console.log("result:", result);
    if (result.response) {
      let tempCart = cart.map((product) => {
        if (product.item._id === Product.item._id && product.Qty > 1) {
          product.Qty = product.Qty - 1;
        }
        return product;
      });
      setCart(tempCart);
    } else {
      alert("Could not decrease the Qty!");
      setCart([]);
      setIsAuth(false);
      history.push("/login");
    }
  };

  //Handles item removal from the cart
  const removeFromCart = async (productDetail) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: productDetail.item._id,
      }),
    };
    const result = await (
      await fetch("/deleteFromCart", requestOptions)
    ).json();
    if (result.response) {
      setCart(cart.filter((product) => product !== productDetail));
    } else {
      alert("Could not remove from cart!");
      setIsAuth(false);
      setCart([]);
      history.push("/login");
    }
  };

  const addOrder = async () => {
    console.log("Adding order...");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userCart: cart,
        userOrders: user.orders,
      }),
    };
    const result = await (await fetch("/addOrder", requestOptions)).json();
    if (result.response === false) {
      alert("Could not proceed further!");
      setIsAuth(false);
      setCart([]);
      history.push("/login");
    }
    let tempCart = cart;
    if (result.response) {
      setUser({
        ...user,
        orders: [...user.orders, { order: tempCart, dateOfOrder: new Date() }],
      });
      console.log(user);
    }
  };

  return (
    <>
      <div className="product flex-container">
        <div className="flex-child1 shadow bg-white rounded">
          <h1>CART</h1>
          <button className="btn btn-danger" onClick={clearCart}>
            Clear Cart
          </button>
          {cart.map((productDetail, index) => {
            const { item, Qty } = productDetail;
            return (
              <div
                className="flex-container shadow rounded mb-3 mt-3"
                key={index}
              >
                <div className="flex-child3">
                  <h3>{item.itemName}</h3>
                  <img src={item.imageURL} alt={item.itemName} />
                </div>
                <div className="flex-child4">
                  <h5>{item.description}</h5>
                  <h4>Rs. {item.cost}</h4>
                  <button
                    className="btn btn-primary mb-2"
                    onClick={() => {
                      plusItemQuantity(productDetail);
                    }}
                  >
                    +
                  </button>
                  <span className="qtyInput">{Qty}</span>
                  <button
                    className="btn btn-primary mb-2"
                    onClick={() => {
                      minusItemQuantity(productDetail);
                    }}
                  >
                    -
                  </button>
                  <br />
                  <br />
                  <button
                    className="btn btn-primary mb-3"
                    onClick={() => removeFromCart(productDetail)}
                  >
                    Remove this Item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-child2 shadow bg-white rounded sticky-top">
          <h1>Cart Total</h1>
          <h4 className="tc">Total Cost: Rs. {getTotalSum()}</h4>
          <button className="btnProceed" onClick={() => addOrder()}>
            <h5>Proceed To Checkout</h5>
          </button>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
