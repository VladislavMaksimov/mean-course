const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");

const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("MongoDB connected."))
  .catch((error) => console.error(error));

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRoute = process.env.API_ROUTE;
app.use(`${apiRoute}/auth`, authRoutes);
app.use(`${apiRoute}/analytics`, analyticsRoutes);
app.use(`${apiRoute}/category`, categoryRoutes);
app.use(`${apiRoute}/order`, orderRoutes);
app.use(`${apiRoute}/position`, positionRoutes);

module.exports = app;
