const express = require("express");
const User = require("../models/user");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kurrwin2@gmail.com",
    pass: "sofsnxhsfourqgzm",
  },
});

router.post("/sign-in", (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/sign-up", (req, res) => {
  new User(req.body)
    .save()
    .then(() => {
      const mailOptions = {
        from: "kurrwin2@gmail.com",
        to: req.body.email,
        subject: "Welcome to Game Craftery",
        text: `Hi ${req.body.fname}, Thank you for signing up, enjoy our games`,
      };
      transporter.sendMail(mailOptions);
      res.status(200).send({ message: "Sign up successfully" });
    })
    .catch((err) => {
      res.status(400).send({ message: "There are some errors" });
    });
});

router.post("/update-score", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { bestScore: req.body.bestScore }
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
