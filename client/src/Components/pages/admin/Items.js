import React from "react";
import { Link } from "react-router-dom";

const Items = ({ itemList, setItemList }) => {
  const deleteItem = async (itemId) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: itemId,
      }),
    };
    const result = await (await fetch("/deleteItem", requestOptions)).json();
    console.log("response:", result.response);
    if (result.response) {
      itemList = itemList.filter((itemElement) => itemElement._id !== itemId);
      console.log("itemsList", itemList);
      setItemList(itemList);
    } else {
      alert("Could not delete Item");
    }
  };
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
              <button className="btn btn-primary float-right mr-2">
                <Link to={`/admin/editItem/${item._id}`} className="text-white">
                  Edit
                </Link>
              </button>
              <button
                className="btn btn-danger float-right"
                onClick={() => {
                  deleteItem(item._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Items;
