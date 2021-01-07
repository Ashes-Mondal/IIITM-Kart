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
  try {
    const usersData = await UserDetail.find();
    res.send({ response: true, usersData: usersData });
  } catch (error) {
    res.send({ response: false, error: error });
  }
};

//ADD ITEM
exports.addItem = async (req, res) => {
  if (req.session.userId === undefined) {
    res.redirect("/login");
    return;
  }

  const itemData = req.body;
  console.log("Item Data:", itemData);
  itemData["_id"] = new mongoose.Types.ObjectId();
  try {
    newItem = await new ItemDetail(itemData);
    await newItem.save();
    res.redirect("/admin/items");
  } catch (err) {
    res.redirect("/login");
  }
};

//Delete ITEM
exports.deleteItem = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  const itemId = req.body.itemId;
  await ItemDetail.findByIdAndDelete(itemId, (err) => {
    if (err) res.send({ response: false, error: err });
    else res.send({ response: true });
  });
};

exports.editItem = async (req, res) => {
  //body details are obtained
  const adminId = req.session.userId;
  if (adminId) {
    await ItemDetail.findByIdAndUpdate(
      req.body.itemId,
      {
        itemId: req.body._id,
        itemName: req.body.itemName,
        description: req.body.description,
        cost: req.body.cost,
        imageURL: req.body.imageURL,
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
    res.send({ response: false, error: err });
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

//Order Delivery status toggle
exports.adminChangeDeliveryStatus = async (req, res) => {
  if (req.session.userId === undefined) {
    res.send({ response: false, error: "Not logged in" });
    return;
  }
  const customerId = req.body.customerId;
  const orderId = req.body.orderId;
  const tempOrder = await OrderDetail.findById(orderId);
  await OrderDetail.findByIdAndUpdate(
    orderId,
    { deliveryStatus: !tempOrder.deliveryStatus },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else {
        //updating customer's database
        const updateCustomer = async () => {
          try {
            let user = await UserDetail.findById(customerId);

            let userOrders = user.orders.map((order) => {
              if (orderId == order._id) {
                order.deliveryStatus = !order.deliveryStatus;
              }
              return order;
            });
            await UserDetail.findByIdAndUpdate(
              customerId,
              { orders: userOrders },
              (err) => {
                if (err) res.send({ response: false, error: err });
                else {
                  res.send({ response: true });
                }
              }
            );
          } catch (error) {
            throw new Error(error);
          }
        };
        try {
          updateCustomer();
        } catch (error) {
          res.send({ response: false, error: error });
        }
      }
    }
  );
};
