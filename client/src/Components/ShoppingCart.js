import React from "react";

function ShoppingCart({ cart, setCart }) {
  const getTotalSum = () => {
    return cart.reduce((sum, { item, Qty }) => sum + item.cost * Qty, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (product_Qty, str_amount) => {
    //if str_amount is empty it defaults to 0
    const amount = str_amount ===""?0:parseInt(str_amount);
    let newCart = [...cart];
    const {item} = product_Qty;
    //Iterating through the array and changing the Qty 
    newCart = newCart.map((itemElement) => {
      if(itemElement.item._id === item._id)itemElement.Qty = amount;
      return itemElement;
    })
    //setting the state of Cart
    setCart(newCart);
  };

  const removeFromCart = (product_Qty) => {
    setCart(cart.filter((product) =>  product !== product_Qty));
  };

  return (
    <>
      <h1>Cart</h1>
      <button onClick={clearCart}>Clear Cart</button>
      <div className="products">
        {cart.map((product_Qty, idx) => {
          const {item,Qty} = product_Qty;
          return(
            <div className="product" key={idx}>
            <h3>{item.ItemName}</h3>
            <h4>Rs. {item.cost}</h4>
            <img src={item.imageURL} alt={item.ItemName} />
            <br />
            <input
              value={Qty}
              onChange={(e) => setQuantity(product_Qty, (e.target.value))}
            />
            <button onClick={() => removeFromCart(product_Qty)}>Remove</button>
            <br />
          </div>
          );
          })}
      </div>

      <div>Total Cost: Rs. {getTotalSum()}</div>
    </>
  );
}

export default ShoppingCart;
