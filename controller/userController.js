const { Sequelize } = require("sequelize");
const user = require("../db/models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const getUser = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const userData = await user.findByPk(userId, {
    attributes: { exclude: ["password", "deletedAt"] },
  });

  if (!userData) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: userData,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { password, ...updatedData } = req.body;

  const [updatedRows, [updatedUser]] = await user.update(updatedData, {
    where: { id: userId },
    returning: true,
    individualHooks: true,
  });

  if (updatedRows === 0) {
    return next(new AppError("Error Updating User", 404));
  }

  if (updatedUser) updatedUser.password = undefined;

  return res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

module.exports = { getUser, updateUser };
