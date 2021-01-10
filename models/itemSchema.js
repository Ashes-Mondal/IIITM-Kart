//Dependencies
const mongoose = require("mongoose");

// itemDetailSchema
const itemDetailSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  itemName: {
    type: String,
    required: true,
  },
  description: {
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
    max: 5,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
});

const ItemDetail = mongoose.model("ItemDetail", itemDetailSchema);

module.exports = { ItemDetail: ItemDetail, itemDetailSchema: itemDetailSchema };
