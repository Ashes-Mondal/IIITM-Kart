const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//Files
const { ItemDetail } = require("../models/itemSchema");
const { UserDetail } = require("../models/userSchema");
const { OrderDetail } = require("../models/orderSchema");

/************************************************USER **********************************************************************/
//FETCH ALL USERS
exports.fetchAllUsers = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  //Fetching data from database
  const usersData = await UserDetail.find();
  res.send({ response: true, usersData: usersData });
};
//EDIT USER DETAILS
exports.adminEditUserDetails = async (req, res) => {
  //body details are obtained
  const adminId = req.session.userId;
  if (adminId) {
    const userId = req.body.userId;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    await UserDetail.findByIdAndUpdate(
      userId,
      {
        address: address,
        phone: phone,
        email: email,
        name: { firstName: firstName, lastName: lastName },
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
/****************************************************************ITEM ************************************************** */
//ADD ITEM
exports.addItem = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  const itemData = req.body;
  itemData["_id"] = new mongoose.Types.ObjectId();
  try {
    newItem = await new ItemDetail(itemData);
    await newItem.save();
    res.send({ response: true });
  } catch (err) {
    res.send({ response: false, error: er });
  }
};
//Delete ITEM
exports.deleteItem = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  const itemId = req.body.itemID;
  await ItemDetail.findByIdAndDelete(itemId, (err) => {
    if (err) res.send({ response: false, error: err });
    else res.send({ response: true });
  });
};

/******************************************************ORDERS****************************************************/
//FETCH ALL USERS
exports.fetchAllOrders = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  //Fetching data from database
  try {
    const ordersData = await OrderDetail.find();
    res.send({ response: true, ordersData: ordersData });
  } catch (err) {
    res.send({ response: false, error: err });
  }
};
//CANCEL ORDER
exports.adminCancelOrder = async (req, res) => {
  const adminId = req.session.userId;
  if (adminId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  const orderId = req.body.orderId;
  const userId = req.body.customerId;

  let orders = await OrderDetail.find();
  orders = orders.filter(order=>order._id!==orderId);
  OrderDetail.findByIdAndUpdate()


  const userDetails = await UserDetail.findById(userId).exec();
  let ordersList = userDetails.orders;
  ordersList = ordersList.filter(orderElement => orderElement._id != orderId);
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