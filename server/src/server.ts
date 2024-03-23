import "dotenv/config";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import app from "./app";


mongoose
  .connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connection is ready...");
    app.listen(3000, () => {
      console.log("server is running now http://localhost:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });


