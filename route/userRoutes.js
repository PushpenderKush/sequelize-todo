const { authentication } = require("../controller/authController");
const { getUser, updateUser } = require("../controller/userController");

const router = require("express").Router();

router.route("/").get(authentication, getUser);
router.route("/update").put(authentication, updateUser);

module.exports = router;
