//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//Files
const routes = require("./routes/routes");
const mongodb = require("./config/dbConfig");

//PORT
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Database
const dbURL = mongodb.mongoDbURL;
mongoose.connect(dbURL,{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true },(err)=>{
  if(err)console.log(err);
  else console.log("successfully connected to Db!")
} );

//Routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
