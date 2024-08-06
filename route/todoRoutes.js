const { authentication } = require("../controller/authController");
const {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  updateTodoCompletion,
} = require("../controller/todoController");

const router = require("express").Router();

router.route("/").get(authentication, getTodos);
router.route("/").post(authentication, createTodo);
router.route("/:id").get(authentication, getTodo);
router.route("/:id").put(authentication, updateTodo);
router.route("/:id").delete(authentication, deleteTodo);
router.route("/:id/completion").put(authentication, updateTodoCompletion);

module.exports = router;
