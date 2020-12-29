//Dependencies
const express = require("express");

//Files
const databaseCRUD = require("../controller/databaseCRUD");

const router = express.Router();

//All the routes
//GET REQUESTS
router.get("/fetchItems",databaseCRUD.fetchItems);
router.get("/fetchAllUsers",databaseCRUD.fetchAllUsers);
router.get("/getUserDetails",databaseCRUD.getUserDetails);
//POST REQUESTS
//router.post("/addItem",databaseCRUD.addItem); Not for users
router.post("/addToCart",databaseCRUD.addToCart);
router.post("/deleteFromCart",databaseCRUD.deleteFromCart);
router.post("/updateQty",databaseCRUD.updateQty);
router.post("/login",databaseCRUD.login);
router.post("/signup",databaseCRUD.signup);
router.post("/logout",databaseCRUD.logout);

//exporting
module.exports = router;