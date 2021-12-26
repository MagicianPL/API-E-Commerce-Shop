const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./data.js");

//middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
