import { Router } from "express";
import foodMenu from "../models/foodMenu.js";

const router = Router();

// GET /api/menu
router.get("/", async (req, res) => {
  try {
    const menus = await foodMenu
      .find({})
      .populate("breakfast.items")
      .populate("lunch.items")
      .populate("dinner.items");

    res.json(menus);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Server error", details: err.message });
  }
});

// POST /api/menu/add
router.post("/add", async (req, res) => {
  const { breakfast, lunch, dinner } = req.body;

  if (!breakfast || !lunch || !dinner) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    const newMenu = new foodMenu({ breakfast, lunch, dinner });
    await newMenu.save();
    res.status(201).json({
      success: true,
      message: "Menu added successfully",
      data: newMenu,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to add menu",
      details: err.message,
    });
  }
});

export default router;
