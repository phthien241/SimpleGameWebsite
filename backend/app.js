const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
mongoose.connect("MongoDB URL")
.then(()=>console.log("Connect to database"))
.catch(()=>console.log("Connection failed"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app