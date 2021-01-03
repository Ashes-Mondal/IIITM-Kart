const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//Files
const { ItemDetail } = require("../models/itemSchema");
const UserDetail = require("../models/userScema");

/****************************Admin functions***********************************/
//FETCH ALL USERS
exports.fetchAllUsers = async (req, res) => {
    //Fetching data from database
    const usersData = await UserDetail.find();
    res.send(usersData);
  };
  //ADD ITEM
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