import React from "react";
import Card from "./Card";

const HomePage = ({ itemList }) => {
  return (
    <div className="col container shadow rounded">
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
