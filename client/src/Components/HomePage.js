import React from "react";
import Card from "./Card";

const HomePage = ({ itemList, cart, setCart }) => {
  return (
    <div className="col container shadow p-3 mb-5 bg-white rounded">
      <div className="row justify-content-center ">
        {itemList.map((item, i) => {
          return (
            <Card key={i} cart={cart} setCart={setCart} product={item} />    
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
