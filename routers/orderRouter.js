const express = require("express");
const Order = require("../models/orderModel");
const userAuth = require("../helpers/userAuth");

const orderRouter = express.Router();

orderRouter.post("/", userAuth, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user.__id,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New order created", order: createdOrder });
  }
});

module.exports = orderRouter;
