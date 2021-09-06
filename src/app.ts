require("dotenv").config();
import express from "express";
import createConnection from "./database";
import { routes } from "./routes";
const mongoose = require("mongoose");

//const cors = require('cors');

createConnection();
const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
//app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

export { app };
