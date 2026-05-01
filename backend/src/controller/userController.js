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

// * Google login controller
const googleLogin = async (req, res, next) => {
  const { name, email, avatar } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    const password = Math.random().toString(36).slice(-8);
    // create user
    user = await User.create({
      name,
      email,
      password,
      avatar,
    });
  }
  const token = jwt.sign(
    { _id: user?._id, name: user.name, email: user.email, avatar: user.avatar },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );
  const newUser = await User.findOne({ email: user.email }).select("-password");
  res.cookie("token", token, cookieOption);
  return responseHandle(res, 200, newUser, "User loggedIn");
};

// ? logout controller
const logout = async (req, res) => {
  res.clearCookie("token", cookieOption);
  return responseHandle(res, 200, {}, "user logged out");
};

// ? get me controller

const getUser = async (req, res, next) => {
  const user = req.user;
  return responseHandle(res, 200, user, "user fetch successfully");
};

// ?update usercontroller
const updateUser = async(req, res, next) => { 
  
}

export { registerUser, login, googleLogin, logout, getUser, updateUser };
