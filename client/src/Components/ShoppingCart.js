import React from "react";

function ShoppingCart({ cart, setCart }) {
  const getTotalSum = () => {
    return cart.reduce((sum, { cost, quantity }) => sum + cost * quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (product, amount) => {
    const newCart = [...cart];
    newCart.find(
      (item) => item.ItemName === product.ItemName
    ).quantity = amount;
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  return (
    <>
      <h1>Cart</h1>
      <button onClick={clearCart}>Clear Cart</button>
      <div className="products">
        {cart.map((product, idx) => (
          <div className="product" key={idx}>
            <h3>{product.ItemName}</h3>
            <h4>Rs. {product.cost}</h4>
            <img src={product.imageURL} alt={product.ItemName} />
            <br />
            <input
              value={product.quantity}
              onChange={(e) => setQuantity(product, parseInt(e.target.value))}
            />
            <button onClick={() => removeFromCart(product)}>Remove</button>
            <br />
          </div>
        ))}
      </div>

      <div>Total Cost: Rs. {getTotalSum()}</div>
    </>
  );
}

export default ShoppingCart;
