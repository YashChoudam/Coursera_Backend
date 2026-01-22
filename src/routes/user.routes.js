import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import authUser from "../middlewares/user.middleware.js"

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
      process.env.JWT_USERSECRET,
    );
    res.json({ token });
  } else {
    res.send({ message: "Incorrect credentials " });
  }
});
userRoutes.get("/course", async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: err.message,
    });
  }
});

userRoutes.post("/purchase", authUser, async (req, res) => {
    try {
        const {courseId} = req.body ;
        const userId = req.user.id ; // came from authUser 

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({message: "User not found"});
        }

        // Add course if not purchased
        if (!user.purchasedCourses.includes(courseId)) {
            user.purchasedCourses.push(courseId);
            await user.save();
        }
        res.json({ success: true, message: "Course purchased successfully" });
    } catch (error) {
        res.status(500).json({success: false , message : "Error purchasing the course "});
    }
});

userRoutes.get("/myCourse", authUser,async (req, res) => {
    try {
        const userId = req.user.id ;
        const user = await userModel.findById(userId).populate("purchasedCourses");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            success: true,
            myCourses: user.purchasedCourses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching purchased courses"
        });
    }
});


export default userRoutes;

