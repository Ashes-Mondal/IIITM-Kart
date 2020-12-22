const mongoose = require("mongoose");
//Files
const {ItemDetail,UserDetail} = require("../models/databaseSchema");

//Controller Functions
exports.fetchUsers = async(req,res)=>{
    const usersData = await UserDetail.find();
    console.log("usersData: ",usersData);
    res.json(usersData);
}
exports.fetchItems = async(req,res)=>{
    const itemsData = await ItemDetail.find();
    console.log("itemsData: ",itemsData);
    res.json(itemsData);
}
exports.addUser = async(req,res)=>{
    let userData = req.body;
    userData["_id"] = new mongoose.Types.ObjectId(),
    console.log(userData);
    try {
        newUser = await new UserDetail(userData);
        await newUser.save();
        res.send("User details Sucessfully saved in Database");
    } catch (error) {
        console.log("Add User error: ",error);
        res.send(`Error occurred ${error}`);
    }
}
exports.addItem = async(req,res)=>{
    const itemData = req.body;
    itemData["_id"] = new mongoose.Types.ObjectId(),
    console.log("itemData: ",itemData);
    try {
        newItem = await new ItemDetail(itemData);
        await newItem.save();
        res.send("Item details Sucessfully saved in Database");
    } catch (error) {
        console.log("Add Item error: ",error);
        res.send(`Error occurred ${error}`);
    }
}