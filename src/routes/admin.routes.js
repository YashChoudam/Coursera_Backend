import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModels from "../models/admin.models.js";
import authAdmin from "../middlewares/admin.middleware.js";
// import adminModels from "../models/admin.models.js";

const adminRoutes = Router();

adminRoutes.use(express.json());

adminRoutes.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    await adminModels.create({
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

adminRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await adminModels.findOne({
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
      process.env.JWT_ADMINSECRET,
    );
    res.json({ token });
  } else {
    res.send({ message: "Incorrect credentials " });
  }
});
adminRoutes.get("/course", async (req, res) => {
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

adminRoutes.post("/deletedCourse", authAdmin, async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  try {
    const deletedCourse = await courseModel.create({
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
      creatorId: req.admin.id,
    });

    return res.status(201).json({
      message: "Course created successfully",
      courseId: deletedCourse._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Course creation failed" });
  }
});

adminRoutes.put("/deletedCourse/modify", authAdmin, async (req, res) => {
  const { oldTitle, title, description, price, imageUrl } = req.body;

  try {
    const updatedCourse = await courseModel.findOneAndUpdate(
      {
        title: oldTitle,
        creatorId: req.admin.id, // Ensure only original admin can modify
      },
      {
        title,
        description,
        price,
        imageUrl,
      },
      { new: true },
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ message: "Course not found or unauthorized" });
    }

    return res.status(200).json({
      message: "Course updated successfully",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error editing the deletedCourse" });
  }
});
adminRoutes.get("/deletedCourse/bulk", authAdmin, async (req, res) => {
  const adminId = req.admin.id;

  try {
    const courses = await courseModel.find({ creatorId: adminId });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error finding the courses", error: error.message });
  }
});

adminRoutes.delete("/course", authAdmin, async (req, res) => {
  const courseTitle = req.body.title;

  try {
    const deletedCourse = await courseModel.findOneAndDelete({
      title: courseTitle,
      creatorId: req.admin.id,
    });
    if (!deletedCourse) {
      return res
        .status(403)
        .send({ message: "There is no course with this title " });
    }
    return res.status(200).json({
      message: "Course deleted successfully",
      deletedCourse: deletedCourse,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error deleting the server ", error });
  }
});
export default adminRoutes;
