require("dotenv").config({ path: `${process.cwd()}/.env` });
const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const { userName, mobile, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await user.create({
    userName,
    mobile,
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    return next(new AppError("Failed creating user", 400));
  }

  const data = newUser.toJSON();
  delete data.password;
  delete data.deletedAt;

  const token = generateToken({
    id: data.id,
  });

  return res.status(200).json({
    status: "Success",
    message: "User created successfully",
    token,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const result = await user.findOne({ where: { email } });

  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Incorrect email or password", 400));
  }

  const token = generateToken({
    id: result.id,
  });

  return res.json({
    status: "success",
    token,
  });
});

const authentication = catchAsync(async (req, res, next) => {
  let idToken = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    idToken = req.headers.authorization.split(" ")[1];
  }

  if (!idToken) {
    return next(new AppError("Please login to get access", 401));
  }

  const tokenDetails = jwt.verify(idToken, process.env.JWT_SECRET_KEY);

  const freshUser = await user.findByPk(tokenDetails.id);

  if (!freshUser) {
    return next(new AppError("User no longer exists", 400));
  }

  req.user = freshUser;
  return next();
});

module.exports = { signup, login, authentication };
