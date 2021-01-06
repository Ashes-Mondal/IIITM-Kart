import React from "react";

const Items = ({ itemList }) => {
  return (
    <div className="adminPanel">
      <h1>Items</h1>
      <button className="btn btn-primary">Add an Item</button>
      {console.log("Items:", itemList)}
      {itemList.map((item, index) => {
        return (
          <div
            key={index}
            className="container shadow bg-white rounded m-3 p-2 text-left row"
          >
            <h3>{item.itemName}</h3>
            <h5 className="m-2">ID: {item._id}</h5>
            <button className="btn btn-primary text-right">Edit</button>
            <button className="btn btn-danger text-right">Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Items;
