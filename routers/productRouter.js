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
  const products = await Product.find();
  console.log(products);
  res.send(products);
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(req.params);
  console.log(product);

  if (product) {
    res.send(product);
    console.log(product);
  } else {
    res.status(404).send({ error: "Product not found" });
  }
});

module.exports = productRouter;
