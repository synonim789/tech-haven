import * as cors from "cors";
import "dotenv/config";
import * as express from "express";
import mongoose from "mongoose";
import * as morgan from "morgan";
import errorHandler from "./helpers/error-handler";
import categoriesRouter from "./routers/categories";
import ordersRouter from "./routers/orders";
import productsRouter from "./routers/products";
import statisticsRouter from "./routers/statistics";
import stripeRouter from "./routers/stripe";
import usersRouter from "./routers/users";

const app = express();

app.use(cors());

// Middleware

app.use(morgan("dev"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);
const api = process.env.API_URL as string;

app.use(`${api}/stripe/webhook`, express.raw({ type: "*/*" }));
app.use(express.json());

app.use(`${api}/stripe`, stripeRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/statistics`, statisticsRouter);

if (!process.env.CONNECTION_STRING) {
  throw new Error("No CONNECTION_STRING variable");
}
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
