const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const data = require("../data");
const generateToken = require("../helpers/generateToken");
const userAuth = require("../helpers/userAuth");

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
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //if password matches
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    res.json({ message: "Sorry, something gone wrong" });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    //new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    //if email already exists
    const existingEmail = User.findOne({ email: user.email }, (err, user) => {
      if (user) {
        res.status(400).send({ error: "Sorry, email already exists!" });
        return;
      }
    });
    //if not
    const createdUser = await user.save();
    res.status(201).json({ createdUser: user });
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
});

userRouter.get("/:id", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = userRouter;
