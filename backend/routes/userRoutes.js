import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = Router();

// POST /api/user/register
router.post("/register", async (req, res) => {
  const { name, phone, email, password, address } = req.body;

  // Basic validation
  if (!name || !phone || !email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Phone number already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      address,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error",
      details: err.message,
    });
  }
});

export default router;
