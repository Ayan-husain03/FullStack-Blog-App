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
  await User.create({
    name,
    email,
    password,
  });
  const user = await User.findOne({ email }).select("-password");
  return responseHandle(res, 201, user, "user created successfully");
};

// ? Login controller
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (!isUser) {
    return next(handleError(401, "User does not exist"));
  }
  const isPasswordCorrect = await isUser.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(handleError(400, "Password is incorrect"));
  }
  return responseHandle(res, 200, {}, "User loggedIn");
};
export { registerUser, login };
