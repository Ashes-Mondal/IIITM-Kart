import React from "react";
import { Link } from "react-router-dom";

const Items = ({ itemList }) => {
  return (
    <div className="adminPanel">
      <h1>Items</h1>
      <button className="btn btn-primary m-3">
        <Link to="/admin/addItem" className="text-white">
          Add an Item
        </Link>
      </button>
      {console.log("Items:", itemList)}
      {itemList.map((item, index) => {
        return (
          <div key={index} className="flex-container m-3 p-2 bg-white ">
            <div className="itemDetails">
              <h3>{item.itemName}</h3>
              <h5 className="m-2">ID: {item._id}</h5>
            </div>
            <div className="itemButtons">
              <button className="btn btn-primary float-right mr-2">Edit</button>
              <button className="btn btn-danger float-right">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Items;
