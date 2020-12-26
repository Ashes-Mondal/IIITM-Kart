//Dependencies
const express = require("express");

//Files
const databaseCRUD = require("../controller/databaseCRUD");

const router = express.Router();

//All the routes
//GET REQUESTS
router.get("/fetchItems",databaseCRUD.fetchItems);
router.get("/fetchAllUsers",databaseCRUD.fetchAllUsers);

//POST REQUESTS
//router.post("/addItem",databaseCRUD.addItem); Not for users
router.post("/addUser",databaseCRUD.addUser);
router.post("/addToCart",databaseCRUD.addToCart);
router.post("/deleteFromCart",databaseCRUD.deleteFromCart);
router.post("/updateQty",databaseCRUD.updateQty);
router.post("/getUserDetails",databaseCRUD.getUserDetails);




//exporting
module.exports = router;