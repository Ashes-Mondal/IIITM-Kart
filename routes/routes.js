//Dependencies
const express = require("express");

//Files
const databaseCRUD = require("../controller/databaseCRUD");

const router = express.Router();

//All the routes
//GET REQUESTS
router.get("/fetchItems",databaseCRUD.fetchItems);
router.get("/fetchUsers",databaseCRUD.fetchUsers);

//POST REQUESTS
router.post("/addItem",databaseCRUD.addItem);
router.post("/addUser",databaseCRUD.addUser);



//exporting
module.exports = router;