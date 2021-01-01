//Dependencies
const express = require("express");
//Files
const controllerFunctions = require("../controller/controllerFunctions");

const router = express.Router();
//All the routes
//GET REQUESTS
router.get("/fetchItems", controllerFunctions.fetchItems);
router.get("/fetchAllUsers", controllerFunctions.fetchAllUsers);
router.get("/getUserDetails", controllerFunctions.getUserDetails);
router.get("/editUserDetails", controllerFunctions.editUserDetails);
router.get("/deleteUser", controllerFunctions.deleteUser);
//POST REQUESTS
//router.post("/addItem",controllerFunctions.addItem); Not for users
router.post("/addToCart", controllerFunctions.addToCart);
router.post("/deleteFromCart", controllerFunctions.deleteFromCart);
router.post("/updateQty", controllerFunctions.updateQty);
router.post("/clearCart", controllerFunctions.clearCart);
router.post("/login", controllerFunctions.login);
router.post("/signup", controllerFunctions.signup);
router.post("/logout", controllerFunctions.logout);

//exporting
module.exports = router;
