const express = require("express");
const Newfeeds = require("../models/newfeeds");
const router = express.Router();

router.post("/post-newfeeds", (req, res) => {
  new Newfeeds(req.body)
    .save()
    .then((response) => {
      res.status(200).send({ message: "Post successfully" });
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

router.get("/get-newfeeds", (req, res) => {
  Newfeeds.find()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

module.exports = router;
