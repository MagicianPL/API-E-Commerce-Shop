const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const data = require("./data.js");
require("dotenv").config();
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const Product = require("./models/productModel");

const port = process.env.PORT || 5000;

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

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Homepage");
});
