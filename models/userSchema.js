//Dependencies
const mongoose = require("mongoose");
const { itemDetailSchema } = require("./itemSchema");

//userDetailSchema
const userDetailSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  admin: Boolean,
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
    unique: true,
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
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  userCart: [{ item: itemDetailSchema, Qty: Number }],
  orders: [
    {
      order: [
        {
          _id: mongoose.Schema.Types.ObjectId,
          item: itemDetailSchema,
          Qty: Number,
          rated: { type: Boolean, default: false },
          userRating: Number,
        },
      ],
      deliveryStatus: Boolean,
      dateOfOrder: String,
      totalCost: Number,
      shippingAddress: String,
      razorpayPaymentId: String,
      razorpayOrderId: String,
      razorpaySignature: String,
    },
  ],
});

const UserDetail = mongoose.model("UserDetail", userDetailSchema);

module.exports = { UserDetail: UserDetail, userDetailSchema: userDetailSchema };
