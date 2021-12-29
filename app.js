const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const data = require("./data.js");
require("dotenv").config();
const userRouter = require("./routers/userRouter");

const port = process.env.PORT || 5000;
console.log(process.env);

//Connection to DB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

//middleware
app.use(cors());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ error: "Product not found" });
  }
});
