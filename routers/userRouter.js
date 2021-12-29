const express = require("express");
const User = require("../models/userModel");
const data = require("../data");

const userRouter = express.Router();

userRouter.get("/seed", async (req, res) => {
  try {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  } catch (err) {
    console.log(err);
    res.send({ error: err.errmsg });
  }
});

module.exports = userRouter;
