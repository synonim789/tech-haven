import * as cors from "cors";
import "dotenv/config";
import * as express from "express";
import * as createHttpError from "http-errors";
import mongoose from "mongoose";
import * as morgan from "morgan";
import categoriesRouter from "./routers/categories";
import ordersRouter from "./routers/orders";
import productsRouter from "./routers/products";
import statisticsRouter from "./routers/statistics";
import stripeRouter from "./routers/stripe";
import usersRouter from "./routers/users";
import errorHandler from "./utils/error-handler";

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

const api = process.env.API_URL as string;

app.use(`${api}/stripe/webhook`, express.raw({ type: "*/*" }));
app.use(express.json());

app.use(`${api}/stripe`, stripeRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/statistics`, statisticsRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use(errorHandler);

mongoose
  .connect(process.env.CONNECTION_STRING as string)
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running now http://localhost:3000");
});
