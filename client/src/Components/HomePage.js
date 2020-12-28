import React from "react";
import Card from "./Card";

const HomePage = ({ itemList, cart, setCart }) => {
  return (
    <div className="col container shadow p-3 mb-5 bg-white rounded">
      <div className="row justify-content-center ">
        {itemList.map((item, i) => {
          return (
            <Card
              key={i}
              id={item._id}
              name={item.ItemName}
              Description={item.Description}
              cost={item.cost}
              imgURL={item.imageURL}
              product={item}
              cart={cart}
              setCart={setCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
