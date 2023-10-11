const mongoose = require("mongoose");

const newfeedsSchema = mongoose.Schema(
  {
    email: String,
    content: String,
    fname: String,
    lname: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Newfeeds", newfeedsSchema)