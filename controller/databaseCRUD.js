//Dependencies
const mongoose = require("mongoose");
const passport = require("passport");
//Files
const { ItemDetail, UserDetail } = require("../models/databaseSchema");
//Controller Functions
/****************************User functions***********************************/
//FETCH ALL USERS
exports.fetchAllUsers = async (req, res) => {
  //Fetching data from database
  const usersData = await UserDetail.find();
  res.send(usersData);
};
//GET USER DETAILS
exports.getUserDetails = async (req, res) => {
  //body details are obtained
  const userId = req.session.userId;
  if (userId) {
    try {
      //user details fetched from the database
      let userDetails = await UserDetail.findById(userId).exec();
      userDetails["response"] = true;
      console.log("userDetails:", userDetails);
      res.send(userDetails);
    } catch (err) {
      res.send({ response: false, error: err });
    }
  } else {
    res.send({ response: false, error: "not logged in" });
  }
};
/************************** CART CRUD OPERATION **********************************/
//ADD TO CART
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
//DELETE FROM CART
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
//UPDATE CART QTY
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
/*****************************LOGIN, SIGNUP, LOGOUT***************************/
//LOGIN
exports.login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await UserDetail.findOne({ phone: phone }).exec();
  if (user.password === password) {
    req.session.userId = user._id;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};
//SIGNUP
exports.signup = async (req, res) => {
  //_id is added then updated to the database
  const userData = {
    _id: new mongoose.Types.ObjectId(),
    name: { firstName: req.body.firstName, lastName: req.body.lastName },
    email: req.body.email,
    phone: req.body.phone,
    Address: req.body.Address,
    password: req.body.password,
  };
  console.log("userData:", userData);
  try {
    newUser = await new UserDetail(userData);
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    res.redirect("/signup");
  }
};
//LOGOUT
exports.logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
/********************************Item funtions********************************/
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
