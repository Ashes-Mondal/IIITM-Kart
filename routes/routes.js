//Dependencies
const express = require("express");
//Files
const userControllerFunctions = require("../controller/userControllerFunctions");
const adminControllerFunctions = require("../controller/adminControllerFunctions");
const api = require("../api/search");

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
router.post("/addOrder", userControllerFunctions.addOrder);
router.post("/search", api.search);
/*************************************** Admin routes ***************************************/
//GET REQUESTS
router.get("/fetchAllUsers", adminControllerFunctions.fetchAllUsers);
//POST REQUESTS
router.post("/addItem", adminControllerFunctions.addItem);

//exporting
module.exports = router;
