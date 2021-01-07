//Dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");
const Razorpay = require("razorpay");

//Files
const { ItemDetail } = require("../models/itemSchema");
const { UserDetail } = require("../models/userSchema");
const { OrderDetail } = require("../models/orderSchema");
const keys = require("../key");
const razorInstance = new Razorpay({
  key_id: keys.key_id,
  key_secret: keys.key_secret,
});

//Controller Functions
/****************************User functions***********************************/
//GET USER DETAILS
exports.getUserDetails = async (req, res) => {
  //body details are obtained
  const userId = req.session.userId;
  if (userId) {
    try {
      //user details fetched from the database
      let userDetails = await UserDetail.findById(userId).exec();
      res.send({ userDetails: userDetails, response: true });
    } catch (err) {
      res.send({ response: false, error: err });
    }
  } else {
    res.send({ response: false, error: "Not logged in" });
  }
};
//EDIT USER DETAILS
exports.editUserDetails = async (req, res) => {
  //body details are obtained
  const userId = req.session.userId;
  if (userId) {
    const phone = req.body.phone;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const orders = req.body.orders;

    await UserDetail.findByIdAndUpdate(
      userId,
      {
        phone: phone,
        email: email,
        name: { firstName: firstName, lastName: lastName },
        orders: orders,
      },
      (err) => {
        if (err) res.send({ response: false, error: err });
        else {
          res.send({ response: true });
        }
      }
    );
  } else {
    res.send({ response: false, error: "Not logged in" });
  }
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
    res.send({ response: false, error: "Not logged in" });
  }
};
/************************** CART CRUD OPERATION **********************************/
//ADD TO CART
exports.addToCart = async (req, res) => {
  //body details are obtained
  const userId = req.session.userId;
  if (userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
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
    if (err) res.send({ response: false, error: err });
    else {
      res.send({ response: true });
    }
  });
};
//DELETE FROM CART
exports.deleteFromCart = async (req, res) => {
  //body details are obtained
  const userId = req.session.userId;
  if (userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
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
  const userId = req.session.userId;
  if (userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
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
  const userId = req.session.userId;
  if (userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  await UserDetail.findByIdAndUpdate(userId, { userCart: [] }, (err) => {
    if (err) res.send({ response: false, error: err });
    else {
      res.send({ response: true });
    }
  });
};

exports.paymentOrder = async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.totalAmt;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorInstance.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
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
    admin: false,
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
//Fetch ALL ITEMS
exports.fetchItems = async (req, res) => {
  //Fetching data from database
  try {
    const itemsData = await ItemDetail.find();
    res.send(itemsData);
  } catch (err) {
    res.send({ response: false, error: err });
  }
};
/***************************************ORDER*****************************/
//ADD ORDER
exports.addOrder = async (req, res) => {
  const userId = req.session.userId;
  if (userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  const orderId = new mongoose.Types.ObjectId();
  await UserDetail.findByIdAndUpdate(
    userId,

    {
      orders: [
        ...req.body.userOrders,
        {
          _id: orderId,
          order: req.body.userCart,
          deliveryStatus: false,
          dateOfOrder: new Date(),
          totalCost: req.body.totalCost,
          razorpayOrderId: req.body.razorpayOrderId,
          razorpayPaymentId: req.body.razorpayPaymentId,
          razorpaySignature: req.body.razorpaySignature,
        },
      ],
    },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else {
        //funtion that adds orders in the databse
        const addOrderToDatabase = async () => {
          const userDetails = await UserDetail.findById(userId);
          const order = {
            _id: orderId,
            deliveryStatus: false,
            user: {
              _id: userDetails._id,
              name: { ...userDetails.name },
              phone: userDetails.phone,
              email: userDetails.email,
              address: userDetails.address,
            },
            order: req.body.userCart,
            dateOfOrder: new Date(),
            totalCost: req.body.totalCost,
            razorpayOrderId: req.body.razorpayOrderId,
            razorpayPaymentId: req.body.razorpayPaymentId,
            razorpaySignature: req.body.razorpaySignature,
          };
          const ord = await new OrderDetail(order);
          await ord.save();
        };
        //function called
        addOrderToDatabase();
        res.send({ response: true, orderId: orderId });
      }
    }
  );
};
//CANCEL ORDER
exports.cancelOrder = async (req, res) => {
  const userId = req.session.userId;
  if (userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  const orderId = req.body.orderId;
  const userDetails = await UserDetail.findById(userId).exec();
  let ordersList = userDetails.orders;
  ordersList = ordersList.filter((orderElement) => orderElement._id != orderId);
  await UserDetail.findByIdAndUpdate(
    userId,
    {
      orders: ordersList,
    },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else {
        res.send({ response: true });
      }
    }
  );
};
