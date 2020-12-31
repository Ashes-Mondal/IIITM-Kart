import React, { useContext } from "react";
import { User } from "../App";

function ShoppingCart({ cart, setCart }) {
  const { user } = useContext(User);
  const getTotalSum = () => {
    return cart.reduce((sum, { item, Qty }) => sum + item.cost * Qty, 0);
  };

  //clears the cart
  const clearCart = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id }),
    };
    const result = await (await fetch("/clearCart", requestOptions)).json();
    console.log("result:", result);
    if (result.response) {
      setCart([]);
    } else {
      alert("Could not clear the cart!");
    }
  };
  // increase qty of item
  const plusItemQuantity = async (Product) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        itemId: Product.item._id,
        itemQty: Product.Qty + 1,
      }),
    };
    const result = await (await fetch("/updateQty", requestOptions)).json();
    console.log("result:", result);
    if (result.response) {
      const tempCart = cart.map((product) => {
        if (product._id === Product._id) {
          product.Qty = product.Qty + 1;
        }
        return product;
      });
      setCart(tempCart);
    } else {
      alert("Could not increase the Qty!");
    }
  };

  // decrease qty of item
  const minusItemQuantity = async (Product) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        itemId: Product.item._id,
        itemQty: Product.Qty - 1,
      }),
    };
    const result = await (await fetch("/updateQty", requestOptions)).json();
    console.log("result:", result);
    if (result.response) {
      let tempCart = cart.map((product) => {
        if (product._id === Product._id && product.Qty > 0) {
          product.Qty = product.Qty - 1;
        }
        return product;
      });
      setCart(tempCart);
    } else {
      alert("Could not decrease the Qty!");
    }
  };

  //Handles item removal from the cart
  const removeFromCart = async (productDetail) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        itemId: productDetail.item._id,
      }),
    };
    const result = await (
      await fetch("/deleteFromCart", requestOptions)
    ).json();
    console.log("result:", result);
    if (result.response) {
      setCart(cart.filter((product) => product !== productDetail));
    } else {
      alert("Could not remove from cart!");
    }
  };

  return (
    <>
      <div className="product flex-container">
        <div className="flex-child1 shadow bg-white rounded">
          <h1>CART</h1>
          <button onClick={clearCart}>Clear Cart</button>
          {cart.map((productDetail, index) => {
            const { item, Qty } = productDetail;
            return (
              <div className="flex-container shadow rounded mb-3 mt-3" key={index}>
                <div className="flex-child3">
                  <h3>{item.ItemName}</h3>
                  <img src={item.imageURL} alt={item.ItemName} />
                </div>
                <div className="flex-child4">
                  <h5>{item.Description}</h5>
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
        <div className="flex-child2 shadow bg-white rounded">
          <h1>Cart Total</h1>
          <div className="list">
            {/*cart.map((product_Qty, idx) => {
              const { item, Qty } = product_Qty;
              return <h2>hi</h2>;
            })*/}
          </div>
          <div className="cost">
            <b>Total Cost: Rs. {getTotalSum()}</b>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;

/*<img src="data:image/png;base64,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" />*/
