import cors from "cors";
import express from "express";
import morgan from "morgan";
import { createRouteHandler } from "uploadthing/express";
import categoriesRouter from "./routers/categories.js";
import ordersRouter from "./routers/orders.js";
import productsRouter from "./routers/products.js";
import statisticsRouter from "./routers/statistics.js";
import stripeRouter from "./routers/stripe.js";
import usersRouter from "./routers/users.js";
import errorHandler from "./utils/error-handler.js";
import { uploadRouter } from "./utils/uploadthing.js";
import env from "./utils/validateEnv.js";

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
app.use(`${api}/uploadthing`, createRouteHandler({ router: uploadRouter }));

app.use(errorHandler);

export default app;
