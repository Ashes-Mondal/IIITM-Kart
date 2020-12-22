//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//Files
const routes = require("./routes/routes");
const mongodb = require("./config/keys");

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

//serve static assets when in production
if(process.env.NODE_ENV === "production"){

  //serve JS and CSS file from this folder
  app.use(express.static("client/build"))

  //For HTML and routes
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./client","build","index.html"));
  })

}

console.log(path.resolve(__dirname,"./client","build","index.html"));
//Routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
