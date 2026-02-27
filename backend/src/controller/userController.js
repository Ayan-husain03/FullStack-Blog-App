// import asyncHandler from "../lib/asyncHandler.js";
import handleError from "../lib/handlerError.js";
import responseHandle from "../lib/responseHandle.js";
import User from "../models/user.model.js";

const registerUser = async (req, res, next) => {
  const { email, name, password } = req.body;
  //   console.log(req.body);
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw handleError(409, "User already registered");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  return responseHandle(res, 201, user, "user created successfully");
};

export { registerUser };
