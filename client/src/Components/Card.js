import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Authentication, User } from "../App";

const Card = (props) => {
  const { isAuth } = useContext(Authentication);
  const { user } = useContext(User);
  const { product, cart, setCart } = props;
  const { itemName, _id: id, description, cost, imageURL } = product;
  const [buttonState, setButtonState] = useState(false);
  //funtion that adds item to the cart
  const addToCart = async (product) => {
    let newCart = [...cart];
    //finding if the item already exist in the cart
    let itemInCart = newCart.find((itemElement) => id === itemElement.item._id);
    if (itemInCart) {
      itemInCart.Qty++;
    } else {
      itemInCart = {
        item: product,
        Qty: 1,
      };
      newCart.push(itemInCart);
    }
    console.log(newCart);

    //Adding the item in user cart
    //POST request option
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, itemId: id }),
    };
    try {
      const response = await (await fetch("/addToCart", requestOptions)).json();
      if (response) {
        setCart(newCart);
        setButtonState(true);
      } else {
        alert("Could not add to cart");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <>
      <div className="card shadow bg-white rounded ">
        <img className=" " alt={itemName} src={imageURL} />
        <div className="justify-content-center">
          <h2>{itemName}</h2>
          <p>{description}</p>
          <p>Rs {cost}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => (buttonState ? null : addToCart(product))}
            disabled={!isAuth}
          >
            {buttonState ? (
              <Link to="/cart" className="btn text-white">
                Go to Cart
              </Link>
            ) : (
              "Add to Cart"
            )}
            <span className="m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart-plus-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
