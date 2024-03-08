const createError = require("../utilis/createError");
const asyncHandler = require("../middleware/async");
const User = require("../models/Users");

const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  }).select("+password");
  if (!user) throw createError(401, `Email doesn't match`);

  const isPassword = await user.matchPassword(req.body.password);
  if (!isPassword) throw createError(401, `Password doesn't match`);
  sendTokenResponse(user, 200, res, "User logged in Successfully");
});

const RegisterUser = asyncHandler(async (req, res, next) => {
  try {
    const newUser = await User.create({ ...req.body });
    sendTokenResponse(newUser, 200, res, "User Created Successfully");
  } catch (error) {
    throw createError(500, "Verification email couldn't be sent", error);
  }
});

const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.genAuthToken();

  const userData = {
    id: user._id,
    // name: user.name,
    email: user.email,
  };

  res
    .status(statusCode)
    .send({ status: "Success", message, token, authData: userData });
};

const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.data });
});


module.exports = {
  RegisterUser,
  login,
  getUsers,
};
