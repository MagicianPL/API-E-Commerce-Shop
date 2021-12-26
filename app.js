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

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ error: "Product not found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
