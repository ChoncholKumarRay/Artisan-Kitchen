import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "Username and password are required",
    });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
    }

    // Creating a JWT token
    const token = jwt.sign(
      { adminId: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server error", details: err.message });
  }
});

export default router;
