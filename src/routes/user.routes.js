import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";

const userRoutes = Router();

userRoutes.use(express.json());

userRoutes.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const salt = bcrypt.genSalt(12);
    const hashedPassword = bcrypt.hash(password, salt);
    await userModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
    res.status(200).send({ message: "Signed up successfully " });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ message: "User already exists" });
    }
    return res.json({ message: "Database error" });
  }
});

userRoutes.post("/login");
userRoutes.post("/course");
userRoutes.post("/purchase");
userRoutes.post("/myCourse");

export default userRoutes;
