import cors from "cors";
import express from "express";
import morgan from "morgan";
import categoriesRouter from "./routers/categories";
import ordersRouter from "./routers/orders";
import productsRouter from "./routers/products";
import statisticsRouter from "./routers/statistics";
import stripeRouter from "./routers/stripe";
import usersRouter from "./routers/users";
import errorHandler from "./utils/error-handler";
import env from "./utils/validateEnv";

const api = env.API_URL;
const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(`${api}/stripe/webhook`, express.raw({ type: "*/*" }));
app.use(express.json());

app.use(`${api}/stripe`, stripeRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/statistics`, statisticsRouter);

app.use(errorHandler);

export default app;
