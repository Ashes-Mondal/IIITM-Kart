//Dependencies
const express = require("express");
//Files
const userControllerFunctions = require("../controller/userControllerFunctions");
const adminControllerFunctions = require("../controller/adminControllerFunctions");
const api_search = require("../api/search");
const api_forgotPassword = require("../api/forgotPassword");

const router = express.Router();
/************************************** User routes *******************************************/
//GET REQUESTS
router.get("/fetchItems", userControllerFunctions.fetchItems);
router.get("/getUserDetails", userControllerFunctions.getUserDetails);
//POST REQUESTS
router.post("/addToCart", userControllerFunctions.addToCart);
router.post("/deleteFromCart", userControllerFunctions.deleteFromCart);
router.post("/updateQty", userControllerFunctions.updateQty);
router.post("/clearCart", userControllerFunctions.clearCart);
router.post("/login", userControllerFunctions.login);
router.post("/signup", userControllerFunctions.signup);
router.post("/logout", userControllerFunctions.logout);
router.post("/editUserDetails", userControllerFunctions.editUserDetails);
router.post("/deleteUser", userControllerFunctions.deleteUser);
router.post("/addRating", userControllerFunctions.addRating);
router.post("/addOrder", userControllerFunctions.addOrder);
router.post("/cancelOrder", userControllerFunctions.cancelOrder);
router.post("/search", api_search.search);
router.post("/paymentOrder", userControllerFunctions.paymentOrder);
router.post("/emailValidation", api_forgotPassword.emailValidation);
router.post("/resetPassword", api_forgotPassword.resetPassword);
/*************************************** Admin routes ***************************************/
//GET REQUESTS
router.get("/fetchAllUsers", adminControllerFunctions.fetchAllUsers);
router.get("/fetchAllOrders", adminControllerFunctions.fetchAllOrders);
//POST REQUESTS
router.post("/addItem", adminControllerFunctions.addItem);
router.post(
  "/adminEditUserDetails",
  adminControllerFunctions.adminEditUserDetails
);
router.post(
  "/adminChangeDeliveryStatus",
  adminControllerFunctions.adminChangeDeliveryStatus
);
router.post("/deleteItem", adminControllerFunctions.deleteItem);
router.post("/editItem", adminControllerFunctions.editItem);
router.post(
  "/adminEditUserDetails",
  adminControllerFunctions.adminEditUserDetails
);

//exporting
module.exports = router;
