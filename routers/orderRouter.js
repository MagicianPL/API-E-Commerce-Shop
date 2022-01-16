const express = require("express");
const Order = require("../models/orderModel");
const userAuth = require("../helpers/userAuth");

const orderRouter = express.Router();

orderRouter.get("/:userId/main", userAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

orderRouter.get("/:id", userAuth, async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

orderRouter.post("/", userAuth, async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    try {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .json({ message: "New order created", order: createdOrder });
    } catch (err) {
      res.json({ message: err.message });
    }
  }
});

orderRouter.patch("/pay/:id", userAuth, async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();
    res.send(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = orderRouter;
