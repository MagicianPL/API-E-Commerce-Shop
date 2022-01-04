const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const data = require("../data");
const generateToken = require("../helpers/generateToken");

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

userRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    //if password matches
    console.log("user is true");
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ error: "Invalid email or password" });
});

userRouter.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  await user.save();
  res.send({ createdUser: user });
});

module.exports = userRouter;
