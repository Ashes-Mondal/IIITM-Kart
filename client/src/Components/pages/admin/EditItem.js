import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditItem = ({
  itemList,
  setItemList,
  setLoaded,
  setCompleteItemList,
  completeItemList,
}) => {
  let history = useHistory();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { itemId } = useParams();
  let item = itemList.filter((item) => item._id === itemId);
  const [itemDetails, setItemDetails] = useState(item[0]);

  const updateItem = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: itemDetails._id,
        itemName: itemDetails.itemName,
        description: itemDetails.description,
        category: itemDetails.category,
        cost: itemDetails.cost,
        imageURL: itemDetails.imageURL,
      }),
    };
    const result = await (await fetch("/editItem", requestOptions)).json();
    if (result.response) {
      setLoaded(false);
      let tempItemList = completeItemList.map((item) => {
        if (item._id === itemId) {
          item = itemDetails;
        }
        return item;
      });
      setItemList(tempItemList);
      setCompleteItemList(tempItemList);
      history.push("/admin/items");
      history.go();
    } else if (result.error === "Not logged in") {
      setShowModal(true);
    } else {
      setError(result.error._message);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div className="adminPanel userbackground">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>OOPS!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Session Timeout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} href="/login">
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      {error !== "" ? (
        <Alert variant="danger">
          <Alert.Heading>
            <h5 style={{ textAlign: "center" }}>{error}</h5>
          </Alert.Heading>
        </Alert>
      ) : null}
      <h1>Edit Item</h1>
      <form
        className="effect3D"
        onSubmit={(e) => {
          e.preventDefault();
          updateItem();
        }}
      >
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
              required
              name="cost"
              placeholder="Cost"
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
        <button className="btn btn-primary">Update Item</button>
        <Link to="/admin/items" className="text-white">
          <button className="btn btn-danger ml-3 float-right">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default EditItem;
