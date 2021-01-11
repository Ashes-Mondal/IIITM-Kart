const mongoose = require("mongoose");
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
  try {
    const usersData = await UserDetail.find();
    res.send({ response: true, usersData: usersData });
  } catch (error) {
    res.send({ response: false, error: error });
  }
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
    try {
      await UserDetail.findByIdAndUpdate(userId, {
        address: address,
        phone: phone,
        email: email,
        name: { firstName: firstName, lastName: lastName },
      });
      res.send({ response: true });
    } catch (error) {
      res.send({ response: false, error: error });
    }
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
    res.redirect("/admin/items");
  } catch (err) {
    res.send({ response: false, error: err });
  }
};

//Delete ITEM
exports.deleteItem = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }

  const itemId = req.body.itemId;
  try {
    await ItemDetail.findByIdAndDelete(itemId);
    res.send({ response: true });
  } catch (error) {
    res.send({ response: false, error: error });
  }
};

//EDIT ITEM
exports.editItem = async (req, res) => {
  //body details are obtained
  const adminId = req.session.userId;
  if (adminId) {
    try {
      await ItemDetail.findByIdAndUpdate(req.body.itemId, {
        itemId: req.body._id,
        itemName: req.body.itemName,
        description: req.body.description,
        cost: req.body.cost,
        imageURL: req.body.imageURL,
      });
      res.send({ response: true });
    } catch (error) {
      res.send({ response: false, error: error });
    }
  } else {
    res.send({ response: false, error: "Not logged in" });
  }
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

//Order Delivery status toggle
exports.adminChangeDeliveryStatus = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  const customerId = req.body.customerId;
  const orderId = req.body.orderId;

  try {
    const tempOrder = await OrderDetail.findById(orderId);
    await OrderDetail.findByIdAndUpdate(orderId, {
      deliveryStatus: !tempOrder.deliveryStatus,
    });

    //the function updating customer's database
    const updateCustomer = async () => {
      try {
        let user = await UserDetail.findById(customerId);
        if (user === null) {
          res.send({ response: false, error: "customer does not exist" });
          return;
        }
        let userOrders = user.orders.map((order) => {
          if (orderId == order._id) {
            order.deliveryStatus = !order.deliveryStatus;
          }
          return order;
        });
        await UserDetail.findByIdAndUpdate(customerId, { orders: userOrders });
        res.send({ response: true });
      } catch (error) {
        throw new Error(error);
      }
    };
    //function call
    updateCustomer();
  } catch (error) {
    res.send({ response: false, error: error });
  }
};
