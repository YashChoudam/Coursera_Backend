import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const courseRoutes = Router();

courseRoutes.use(express.json());

courseRoutes.post("/signup");
courseRoutes.post("/login");
courseRoutes.post("/course");
courseRoutes.post("/purchase");
courseRoutes.post("/myCourse");

export default courseRoutes;