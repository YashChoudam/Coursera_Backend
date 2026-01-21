import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const courseRoutes = Router();

courseRoutes.use(express.json());

adminRoutes.post("/login",(req,res)=>{
  res.send("Login Route");
});
export default courseRoutes;