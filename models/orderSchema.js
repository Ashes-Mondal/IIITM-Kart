//Dependencies
const mongoose = require("mongoose");
const { itemDetailSchema } = require("./itemSchema");

// itemDetailSchema
const orderDetailSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,//orderId
  deliveryStatus:Boolean,
  user: {
    _id:mongoose.Schema.Types.ObjectId,//userId
    name:{firstName:String,lastName:String},
    phone:String,
    email:String,
    address:String,
  },
  order: [
          {
            item: itemDetailSchema,
            Qty: Number,
          },
        ],
  dateOfOrder: String,
  totalCost: Number,
  razorpayPaymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

module.exports = {
  OrderDetail: OrderDetail,
  orderDetailSchema: orderDetailSchema,
};
