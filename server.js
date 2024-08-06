require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRoutes = require("./route/authRoutes");
const todoRoutes = require("./route/todoRoutes");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", todoRoutes);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

app.listen(process.env.APP_PORT, () => {
  console.log("server up and running");
});
