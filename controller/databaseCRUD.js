//Dependencies
const mongoose = require("mongoose");
//Files
const { ItemDetail, UserDetail } = require("../models/databaseSchema");

//Controller Functions

//User functions
exports.fetchAllUsers = async (req, res) => {
  //Fetching data from database
  const usersData = await UserDetail.find();
  res.send(usersData);
};
exports.getUserDetails = async (req, res) => {
  //body details are obtained
  const userId = req.body.userId;
  try {
    //user details fetched from the database
    let userDetails = await UserDetail.findById(userId).exec();
    userDetails["response"] = true;
    console.log(userDetails);
    res.send(userDetails);
  } catch (err) {
    res.send({ response: false,error:err });
  }
};
exports.addUser = async (req, res) => {
  //body details are obtained
  let userData = req.body;
  //_id is added then updated to the database
  userData["_id"] = new mongoose.Types.ObjectId();
  try {
    newUser = await new UserDetail(userData);
    await newUser.save();
    res.send({ response: true });
  } catch (error) {
    res.send({ response: false });
  }
};
exports.addToCart = async (req, res) => {
  //body details are obtained
  const userId = req.body.userId;
  const itemId = req.body.itemId;
  //item and user details fetched from the database
  const itemDetails = await ItemDetail.findById(itemId).exec();
  const userDetails = await UserDetail.findById(userId).exec();
  //User cart details fetched
  let userCart = userDetails.userCart;
  //flag checks whether the item is there in cart or not,if not then added to the userCart
  let flag = true;
  userCart = userCart.map((itemElement) => {
    if (itemElement.item._id == itemId) {
      itemElement.item = itemDetails;
      itemElement.Qty += 1;
      flag = false;
      return itemElement;
    }
  });
  if (flag) userCart = [...userCart, { item: itemDetails, Qty: 1 }];
  //Finally the userCart is updated to the database
  await UserDetail.findByIdAndUpdate(userId, { userCart: userCart }, (err) => {
    if (err) res.send({ response: false });
    else {
      res.send({ response: true });
    }
  });
};
exports.deleteFromCart = async (req, res) => {
  //body details are obtained
  const userId = req.body.userId;
  const itemId = req.body.itemId;
  //user details fetched from the database
  const userDetails = await UserDetail.findById(userId).exec();
  //User cart details fetched
  let userCart = userDetails.userCart;
  //userCart is filtered and that item is removed
  userCart = userCart.filter((itemElement) => {
    if (itemElement.item._id != itemId) return itemElement;
  });
  //Finally the userCart is updated to the database
  await UserDetail.findByIdAndUpdate(userId, { userCart: userCart }, (err) => {
    if (err) res.send({ response: false, error: err });
    else {
      res.send({ response: true });
    }
  });
};
exports.updateQty = async (req, res) => {
  //body details are obtained
  const userId = req.body.userId;
  const itemId = req.body.itemId;
  const itemQty = req.body.itemQty;
  //user details fetched from the database
  const userDetails = await UserDetail.findById(userId).exec();
  //User cart details fetched
  let userCart = userDetails.userCart;
  //userCart is filtered and that item is removed
  userCart = userCart.map((itemElement) => {
    if (itemElement.item._id == itemId) {
      itemElement.Qty = itemQty;
    }
    return itemElement;
  });
  //Finally the userCart is updated to the database
  await UserDetail.findByIdAndUpdate(userId, { userCart: userCart }, (err) => {
    if (err) res.send({ response: false, error: err });
    else {
      res.send({ response: true });
    }
  });
};

//Item funtions
exports.fetchItems = async (req, res) => {
  //Fetching data from database
  try {
    const itemsData = await ItemDetail.find();
    res.send(itemsData);
  } catch (err) {
    res.send({ response: false, error: err });
  }
};
exports.addItem = async (req, res) => {
  const itemData = req.body;
  (itemData["_id"] = new mongoose.Types.ObjectId()),
    console.log("itemData: ", itemData);
  try {
    newItem = await new ItemDetail(itemData);
    await newItem.save();
    res.send("Item details Sucessfully saved in Database");
  } catch (error) {
    console.log("Add Item error: ", error);
    res.send(`Error occurred ${error}`);
  }
};
