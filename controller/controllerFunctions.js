//Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//Files
const { ItemDetail } = require("../models/itemSchema");
const UserDetail = require("../models/userScema");
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
      userDetails._doc["response"] = true;
      res.send(userDetails);
    } catch (err) {
      res.send({ response: false, error: err });
    }
  } else {
    res.send({ response: false, error: "not logged in" });
  }
};
//EDIT USER DETAILS
exports.editUserDetails = async (req, res) => {
  //body details are obtained
  const userId = req.session.userId;
  const phone = req.body.phone;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  await UserDetail.findByIdAndUpdate(
    userId,
    {
      phone: phone,
      email: email,
      name: { firstName: firstName, lastName: lastName },
    },
    (err) => {
      if (err) res.send({ response: false });
      else {
        res.send({ response: true });
      }
    }
  );
};
//DELETE USER
exports.deleteUser = async (req, res) => {
  //body details are obtained
  const userId = req.session.userId;
  if (userId) {
    try {
      //user details fetched from the database
      let userDetails = await UserDetail.findByIdAndDelete(userId).exec();
      userDetails["response"] = true;
      res.redirect("/login");
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
    }
    return itemElement;
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
//CLEAR CART
exports.clearCart = async (req, res) => {
  await UserDetail.findByIdAndUpdate(
    req.body.userId,
    { userCart: [] },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else {
        res.send({ response: true });
      }
    }
  );
};
/*****************************LOGIN, SIGNUP, LOGOUT***************************/
//LOGIN
exports.login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await UserDetail.findOne({ phone: phone }).exec();

  if (!user) {
    res.redirect("/login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    req.session.userId = user._id;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};
//SIGNUP
exports.signup = async (req, res) => {
  //_id is added then updated to the database
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    _id: new mongoose.Types.ObjectId(),
    name: { firstName: req.body.firstName, lastName: req.body.lastName },
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: hashedPassword,
  };
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
  itemData["_id"] = new mongoose.Types.ObjectId();
  try {
    newItem = await new ItemDetail(itemData);
    await newItem.save();
    res.send("Item details Sucessfully saved in Database");
  } catch (error) {
    console.log("Add Item error: ", error);
    res.send(`Error occurred ${error}`);
  }
};

/***************************************ORDER*****************************/

exports.addOrder = async (req, res) => {
  orderId = new mongoose.Types.ObjectId();
  await UserDetail.findByIdAndUpdate(
    req.session.userId,

    {
      orders: [
        ...req.body.userOrders,
        {
          _id: orderId,
          order: req.body.userCart,
          dateOfOrder: new Date().toString(),
        },
      ],
    },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else {
        res.send({ response: true, orderId: orderId });
      }
    }
  );
};

exports.clearOrders = async (req, res) => {
  console.log("Emptying orders list...");
  await UserDetail.findByIdAndUpdate(
    req.session.userId,
    {
      orders: [],
    },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else {
        res.send({ response: true });
      }
    }
  );
};

exports.cancelOrder = async (req, res) => {
  const userId = req.session.userId;
  const orderId = req.body.orderId;
  const userDetails = await UserDetail.findById(userId).exec();
  let ordersList = userDetails.orders;
  console.log("server before cancelling order:", ordersList);
  ordersList = ordersList.filter((orderElement) => {
    if (orderElement._id != orderId) return orderElement;
  });

  await UserDetail.findByIdAndUpdate(
    userId,
    {
      orders: ordersList,
    },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else {
        res.send({ response: true });
        console.log("server after cancelling order:", ordersList);
      }
    }
  );
};
