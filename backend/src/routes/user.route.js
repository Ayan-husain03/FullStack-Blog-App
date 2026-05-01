import { Router } from "express";
import {
  getUser,
  googleLogin,
  login,
  logout,
  registerUser,
  updateUser,
} from "../controller/userController.js";
import authMiddleware from "../middleware/auth.middleware.js";

// console.log("User Router Loaded");
const userRouter = Router();
// userRouter.route("/register").post(registerUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.post("/google", googleLogin);
userRouter.get("/logout", logout);
userRouter.get("/me", getUser);
userRouter.get("/update-user", authMiddleware, updateUser);
export default userRouter;
