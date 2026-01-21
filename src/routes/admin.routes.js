import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRoutes = Router();

adminRoutes.use(express.json());

adminRoutes.post("/signup",(req,res)=>{
  res.send("Login Route");
});
adminRoutes.post("/login",(req,res)=>{
  res.send("Login Route");
});
adminRoutes.post("/course",(req,res)=>{
  res.send("Course Route");
});
adminRoutes.post("/purchase",(req,res)=>{
  res.send("Course Purchase route");
});
adminRoutes.post("/myCourse",(req,res)=>{
  res.send("myCourse Route")
});

export default adminRoutes;