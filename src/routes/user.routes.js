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

userRoutes.post("/login",(req,res)=>{
  res.send("Login Route");
});
userRoutes.post("/course",(req,res)=>{
  res.send("Course Route");
});
userRoutes.post("/purchase",(req,res)=>{
  res.send("Course Purchase route");
});
userRoutes.post("/myCourse",(req,res)=>{
  res.send("myCourse Route")
});

export default userRoutes;
