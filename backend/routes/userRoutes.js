import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = Router();

// POST /api/user/register
router.post("/register", async (req, res) => {
  const { name, phone, email, password, address } = req.body;

  if (!name || !phone || !email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Phone number already registered" });
    }

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

// POST /api/user/login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Missing credentials" });
  }

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid phone or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid phone or password" });
    }

    const { _id, name, email, address } = user;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { user_id: _id, name, phone, email, address },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server error", details: err.message });
  }
});

export default router;
