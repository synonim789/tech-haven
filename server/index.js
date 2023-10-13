const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.options("*", cors());
// Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

require("dotenv/config");
const api = process.env.API_URL;

const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running now http://localhost:3000");
});
