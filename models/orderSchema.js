//Dependencies
const mongoose = require("mongoose");
const { userDetailSchema } = require("./userSchema");
const { itemDetailSchema } = require("./itemSchema");

// itemDetailSchema
const orderDetailSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,//orderId
  orderDetails: {
    user: userDetailSchema,
    order: [
          {
            _id: mongoose.Schema.Types.ObjectId,
            item: itemDetailSchema,
            Qty: Number,
          },
        ],
    dateOfOrder: String,
    totalCost: Number,
    razorpayPaymentId: String,
    razorpayOrderId: String,
    razorpaySignature: String
  },
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

module.exports = {
  OrderDetail: OrderDetail,
  orderDetailSchema: orderDetailSchema,
};
