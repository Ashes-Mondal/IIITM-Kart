//Dependencies
const express = require("express");

//Files
const fetchOp = require("../controller/fetchOp");

const router = express.Router();

//All the routes
router.get("/",fetchOp.fetchJson)



//exporting
module.exports = router;