const express = require("express");
const Product = require("../models/productModel");
const data = require("../data");

const productRouter = express.Router();

productRouter.get("/seed", async (req, res) => {
  try {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  } catch (err) {
    console.log(err);
    res.send({ error: err.errmsg });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length < 1) {
      return res.status(404).json({ message: "Error - Nothing found" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = productRouter;
