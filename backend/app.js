const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user")
const newfeedsRoutes = require("./routes/newfeeds")

const app = express();
mongoose.connect("mongodb+srv://kurrwin1:Thapdienmaiphuc241!@cluster0.uqwplwt.mongodb.net/game?retryWrites=true&w=majority")
.then(()=>console.log("Connect to database"))
.catch((err)=>console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/api/users",userRoutes)
app.use("/api/newfeeds", newfeedsRoutes)

module.exports = app