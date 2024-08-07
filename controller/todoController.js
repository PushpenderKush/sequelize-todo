const todo = require("../db/models/todo");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createTodo = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  const createdBy = req.user.id;

  const todoData = await todo.create({ title, description, createdBy });

  return res.status(201).json({
    status: "success",
    data: todoData,
  });
});

const getTodos = catchAsync(async (req, res, next) => {
  const createdBy = req.user.id;

  const todos = await todo.findAll({ where: { createdBy } });

  return res.status(200).json({
    status: "success",
    data: todos,
  });
});

const getTodo = catchAsync(async (req, res, next) => {
  const createdBy = req.user.id;
  const { id } = req.params;

  const todos = await todo.findOne({ where: { id, createdBy } });

  if (!todos) {
    return next(new AppError("Todo not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: todos,
  });
});

const updateTodo = catchAsync(async (req, res, next) => {
  const createdBy = req.user.id;
  const { id } = req.params;
  const { title, description } = req.body;

  const [updatedRows, [updatedTodo]] = await todo.update(
    { title, description },
    { where: { id, createdBy }, returning: true, individualHooks: true }
  );

  if (updatedRows === 0) {
    return next(new AppError("Todo not found or not updated", 404));
  }

  return res.status(200).json({
    status: "success",
    data: updatedTodo,
  });
});

const deleteTodo = catchAsync(async (req, res, next) => {
  const createdBy = req.user.id;
  const { id } = req.params;

  const todos = await todo.findOne({ where: { id, createdBy } });

  if (!todos) {
    return next(new AppError("Todo not found", 404));
  }

  await todos.destroy();

  return res.status(204).json({
    status: "success",
    data: null,
  });
});

const updateTodoCompletion = catchAsync(async (req, res, next) => {
  const createdBy = req.user.id;
  const { id } = req.params;
  const { isCompleted } = req.body;

  const [updatedRows, [updatedTodo]] = await todo.update(
    { isCompleted: isCompleted },
    { where: { id, createdBy }, returning: true, individualHooks: true }
  );

  if (updatedRows === 0) {
    return next(new AppError("Todo not found or not updated", 404));
  }

  return res.status(200).json({
    status: "success",
    data: updatedTodo,
  });
});

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  updateTodoCompletion,
};
