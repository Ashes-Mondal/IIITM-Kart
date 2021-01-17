import React, { useState, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Authentication } from "../../App";
import Button from "@material-ui/core/Button";
const ProductDetails = ({ itemList, cart, setCart }) => {
  const { isAuth, setIsAuth } = useContext(Authentication);
  const history = useHistory();
  const { itemId } = useParams();
  let item = itemList.filter((item) => item._id === itemId)[0];
  const {
    category,
    itemName,
    _id: id,
    description,
    cost,
    imageURL,
    rating,
    numberOfRatings,
  } = item;
  console.log("item:", item);
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
    //Adding the item in user cart
    //POST request option
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId: id }),
    };
    try {
      const result = await (await fetch("/addToCart", requestOptions)).json();
      if (result.response) {
        setCart(newCart);
        setButtonState(true);
      } else {
        setIsAuth(false);
        history.push("/login");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  return (
    <div className="productDetails">
      <button
        className="backButton"
        onClick={() => {
          history.push("/");
        }}
      >
        Back
      </button>
      <h1>Product Details</h1>
      <br />
      <div className="row">
        <div className="col-6">
          <img className="productDetailsImg" src={imageURL} alt="" />
        </div>
        <div className="col-6">
          <div>{category}</div>
          <h2>{itemName}</h2>
          <h6>{description}</h6>

          {rating ? (
            <span
              className={
                rating < 2 ? "rating1" : rating < 4 ? "rating2" : "rating3"
              }
            >
              <b>{rating}</b>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="30"
                fill="currentColor"
                className="bi bi-star"
                viewBox="0 3 16 16"
              >
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
              </svg>
            </span>
          ) : (
            "This Item has not been rated yet."
          )}
          <span className="text-muted ml-2 numRatings">
            ({numberOfRatings} {numberOfRatings === 1 ? "rating" : "ratings"})
          </span>
          <div className="biggerFont">
            <b>Rs {cost}</b>
            <span className="originalCost text-muted">
              Rs {Math.round(cost / 0.8)}
            </span>
            <span className="discount">(20% OFF)</span>
          </div>
          <div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className="addToCart mt-auto"
              style={{ margin: "auto" }}
              onClick={() => (buttonState ? null : addToCart(item))}
            >
              {isAuth ? (
                buttonState ? (
                  <Link to="/cart" className=" text-white">
                    Go to Cart
                  </Link>
                ) : (
                  "Add to Cart"
                )
              ) : (
                <Link to="/login" className=" text-white">
                  Add to Cart
                </Link>
              )}

              <span className="m-1 ml-2">
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
            </Button>
          </div>
          <br />
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque id aliquet nulla, nec dapibus ex. Fusce suscipit lectus
            sit amet risus commodo, at tincidunt sapien semper. Donec eget
            aliquam orci. Mauris eleifend accumsan vehicula. Nullam lacinia
            metus ac egestas molestie. Quisque magna magna, venenatis eget diam
            a, porta bibendum urna. Integer facilisis tempus enim at vulputate.
            Nunc iaculis pharetra risus, vel convallis dui. Vestibulum eu
            ultricies orci.
          </p>
          <p>
            Fusce est turpis, sollicitudin eget facilisis ut, consectetur vel
            massa. Maecenas et nulla libero. Cras rutrum magna id leo commodo,
            in ullamcorper justo efficitur. Vivamus et finibus ante, ut vehicula
            metus. Suspendisse in nulla ipsum. Nunc blandit, urna non consequat
            aliquam, neque risus congue ante, eu scelerisque ante odio at leo.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Vestibulum nec consequat ligula. Nullam
            tempor eget risus id maximus.
          </p>
        </div>
      </div>
      <h5>Similar items:</h5>
      <div className="similarItems">
        {itemList.map((product, i) => {
          if (product.category === item.category)
            return (
              <div
                className="m-3 similarItem homeCard"
                onClick={() => {
                  console.log("Product Details:", product);
                  window.location.href = `/productDetails/${product._id}`;
                }}
              >
                <img src={product.imageURL} alt="???" />
                <div className="similarItemDescription">
                  {product.description}
                </div>
                <div>Rs.{product.cost}</div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
