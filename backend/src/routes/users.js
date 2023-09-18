// routes/users.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  // Check if the user already exists in the database
  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // Create a new user
  const newUser = new UserModel({
    username,
    password: hashPassword,
    firstname,
    lastname,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  // Implement your login logic here
  const { username, password, firstname, lastname } = req.body;
  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    return res.json({ message: "User Doesn't Exist" });
  }
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect!" });
  }
  const token = jwt.sign({ id: existingUser._id }, "secret");
  res.json({ token, userID: existingUser._id });
});

export { router as userRouter };
