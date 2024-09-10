import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    minlength: [2, "name must be at least 2 characters"],
    maxlength: [20, "name cannot exceed 20 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: [6, "password must be at least 6 characters"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
