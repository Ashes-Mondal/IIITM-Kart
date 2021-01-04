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
<<<<<<< HEAD
//router.post("/addItem",controllerFunctions.addItem); Not for users
router.post("/addToCart", controllerFunctions.addToCart);
router.post("/deleteFromCart", controllerFunctions.deleteFromCart);
router.post("/updateQty", controllerFunctions.updateQty);
router.post("/clearCart", controllerFunctions.clearCart);
router.post("/login", controllerFunctions.login);
router.post("/signup", controllerFunctions.signup);
router.post("/logout", controllerFunctions.logout);
router.post("/editUserDetails", controllerFunctions.editUserDetails);
router.post("/deleteUser", controllerFunctions.deleteUser);
router.post("/search", api.search);
=======
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
router.post("/addItem",adminControllerFunctions.addItem);
>>>>>>> be59cffe9dfea4b5ce8b0699be510766dd4b9c19

//exporting
module.exports = router;
