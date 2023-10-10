const express = require("express");
const User = require("../models/user");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kurrwin2@gmail.com",
    pass: "rrambytqiuwacsmp",
  },
});

router.post("/sign-up", (req, res) => {
  new User(req.body)
    .save()
    .then(() => {
    //   const mailOptions = {
    //     from: "kurrwin2@gmail.com",
    //     to: req.body.email,
    //     subject: "Welcome to Game Craftery",
    //     text: `Hi ${req.body.fname}, Thank you for signing up, enjoy our games`,
    //   };
    //   transporter.sendMail(mailOptions);
      res.status(200).send({ message: "Sign up successfully" });
    })
    .catch((err) => {
      res.status(400).send({ message: "There are some errors" });
    });
});

module.exports = router;
