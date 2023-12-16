import express from "express";
import userRouter from "./src/modules/User/user.routes.js";
import msgRouter from "./src/modules/Messages/message.routes.js";
import db_connection from "./DB/connection.js";
import { config } from "dotenv";
import { globalResponse } from "./src/middlewares/globalResponse.js";

const app = express();
config();

app.use(express.json());
app.use("/user", userRouter);
app.use("/msg", msgRouter);
app.use(globalResponse);

db_connection();

app.get("/", (req, res) => res.send("hello world"));
app.listen(process.env.PORT, () =>
  console.log(`saraha app listening on port ${process.env.PORT}!`)
);
