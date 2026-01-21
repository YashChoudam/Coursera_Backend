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
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
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

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await userModel.findOne({
    email: email,
  });

  if (!response) {
    return res.json({ message: "User does not exist with this email" });
  }

  const passwordMatch = await bcrypt.compare(password, response.password);
  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: response._id,
        email: response.email,
      },
      process.env.JWT_SECRET,
    );
    res.json({ token });
  } else {
    res.send({ message: "Incorrect credentials " });
  }
});
userRoutes.post("/course", (req, res) => {
  res.send("Course Route");
});
userRoutes.post("/purchase", (req, res) => {
  res.send("Course Purchase route");
});
userRoutes.post("/myCourse", (req, res) => {
  res.send("myCourse Route");
});

export default userRoutes;
