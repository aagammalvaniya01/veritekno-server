const { RegisterUser, login, getUsers } = require("../controller/auth");
const router = require("express").Router();
const User = require("../models/Users");
const advanceResults = require("../middleware/advanceResults");

router.route("/register").post(RegisterUser);
router.route("/login").post(login);
router.route("/").get(advanceResults(User), getUsers);

module.exports = router;
