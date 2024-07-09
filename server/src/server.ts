import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
import env from "./utils/validateEnv";

const port = process.env.PORT || 3000;

mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connection is ready...");
    app.listen(port, () => {
      console.log(`server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
