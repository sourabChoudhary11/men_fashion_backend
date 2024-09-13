import express from "express";
import { register, login, profile } from "../controllers/user.js";

const userRoute = express.Router();

userRoute.get("/:id", profile);
userRoute.post("/register", register);
userRoute.post("/login", login);

export default userRoute;
