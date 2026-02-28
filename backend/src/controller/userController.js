// import asyncHandler from "../lib/asyncHandler.js";
import asyncHandler from "../lib/asyncHandler.js";
import handleError from "../lib/handlerError.js";
import responseHandle from "../lib/responseHandle.js";
import User from "../models/user.model.js";

const registerUser = async (req, res, next) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return next(handleError(401, "All fields are required"));
  }
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return next(handleError(409, "User already registered"));
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  return responseHandle(res, 201, user, "user created successfully");
};

const createUser = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(handleError(401, "name is required"));
  }
  return responseHandle(res, 200, name, "name getting");
};

// ? Login controller
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = await User.find({ email });
  if (!isUser) {
    throw handleError(401, "User not exist");
  }
  const isPasswordCorrect = isUser.comparePassword(password);
  if (!isPasswordCorrect) {
    throw handleError(400, "Password is invalid");
  }
  return responseHandle(200, {}, "User logged in");
});
export { registerUser, login, createUser };
