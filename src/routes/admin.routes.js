import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRoutes = Router();

adminRoutes.use(express.json());

adminRoutes.post("/signup");
adminRoutes.post("/login");
adminRoutes.post("/course");
adminRoutes.post("/purchase");
adminRoutes.post("/myCourse");

export default adminRoutes;