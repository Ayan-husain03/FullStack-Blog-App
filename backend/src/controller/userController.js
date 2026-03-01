// import asyncHandler from "../lib/asyncHandler.js";
import asyncHandler from "../lib/asyncHandler.js";
import handleError from "../lib/handlerError.js";
import responseHandle from "../lib/responseHandle.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// ? ====== cookies options ===========
const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  path: "/",
};
// ? ====== ===========================

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
  const token = jwt.sign(
    { _id: isUser?._id, name: isUser.name, email: isUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );
  const user = await User.findOne({ email: isUser.email }).select("-password");
  res.cookie("token", token, cookieOption);
  return responseHandle(res, 200, user, "User loggedIn");
};
export { registerUser, login };
