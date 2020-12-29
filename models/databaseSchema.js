//Dependencies
const mongoose = require("mongoose");

//Schemas
const itemDetailSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ItemName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
  },
});

const userDetailSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /\d{10}/,
  },
  password: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  userCart: [{ item: itemDetailSchema, Qty: Number }],
  orders: [
    {
      order: [{ item: itemDetailSchema, Qty: Number }],
      dateOfOrder: Date,
    },
  ],
});


const ItemDetail = mongoose.model("ItemDetail", itemDetailSchema);
const UserDetail = mongoose.model("UserDetail", userDetailSchema);

module.exports = { ItemDetail, UserDetail };
