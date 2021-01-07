import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";

const EditItem = ({ itemList }) => {
  let history = useHistory();
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(() => {
    let item = itemList.filter((item) => item._id === itemId);
    return item[0];
  });

  if (itemDetails === undefined) {
    setItemDetails({
      category: "",
      cost: "",
      description: "",
      imageURL: "",
      itemName: "",
    });
  }

  const updateItem = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: itemDetails._id,
        itemName: itemDetails.itemName,
        description: itemDetails.description,
        cost: itemDetails.cost,
        imageURL: itemDetails.imageURL,
      }),
    };
    const result = await (await fetch("/editItem", requestOptions)).json();
    if (result.response === false) {
      alert("Could not update! " + result.err);
    }
  };
  if (itemDetails === undefined) {
    history.push("/admin/items");
    return;
  }
  return (
    <div className="adminPanel">
      <h1>Edit Item</h1>
      <form className="effect3D">
        <h3>Edit Item Details</h3>
        <div className="row">
          <div className="col-12">
            <label>Item Name: </label>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              required
              value={itemDetails.itemName}
              onChange={(e) => {
                setItemDetails({ ...itemDetails, itemName: e.target.value });
              }}
            ></input>
          </div>
          <div className="col-12">
            <label>Description: </label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
              value={itemDetails.description}
              onChange={(e) => {
                setItemDetails({ ...itemDetails, description: e.target.value });
              }}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label>Category: </label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              required
              value={itemDetails.category}
              onChange={(e) => {
                setItemDetails({ ...itemDetails, category: e.target.value });
              }}
            ></input>
          </div>
          <div className="col-12">
            <label>Cost: </label>
            <input
              type="text"
              name="cost"
              placeholder="Cost"
              required
              value={itemDetails.cost}
              onChange={(e) => {
                setItemDetails({ ...itemDetails, cost: e.target.value });
              }}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label>Image URL: </label>
            <input
              type="text"
              name="imageURL"
              placeholder="Image URL"
              required
              value={itemDetails.imageURL}
              onChange={(e) => {
                setItemDetails({ ...itemDetails, imageURL: e.target.value });
              }}
            ></input>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            updateItem();
          }}
        >
          Update Item
        </button>
        <Link to="/admin/items" className="text-white">
          <button className="btn btn-danger ml-3 float-right">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditItem;
