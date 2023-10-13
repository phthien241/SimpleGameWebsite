const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fname: {type: String},
  lname: {type: String},
  bestScore:{type: Number}
});

module.exports = mongoose.model("User",userSchema);
