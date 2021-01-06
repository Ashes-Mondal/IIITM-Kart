const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//Files
const { ItemDetail } = require("../models/itemSchema");
const UserDetail = require("../models/userScema");

/****************************Admin functions***********************************/
//FETCH ALL USERS
exports.fetchAllUsers = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  //Fetching data from database
  const usersData = await UserDetail.find();
  res.send({response:true,usersData:usersData});
};
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
    res.send({response:true});
  } catch (err) {
    res.send({response:false,error:er});
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
        address:address,
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
