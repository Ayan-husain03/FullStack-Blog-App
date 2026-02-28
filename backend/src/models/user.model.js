import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
// ? pre hook for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ? compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
