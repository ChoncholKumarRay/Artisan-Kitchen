import { Router } from "express";
import foodMenu from "../models/foodMenu.js";
import { adminAuth } from "../middlewares/adminAuth.js";

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
router.post("/add", adminAuth, async (req, res) => {
  const { breakfast = [], lunch = [], dinner = [] } = req.body;

  if (!breakfast.length && !lunch.length && !dinner.length) {
    return res.status(400).json({
      success: false,
      error: "At least one of breakfast, lunch, or dinner items is required",
    });
  }

  try {
    let menu = await foodMenu.findOne();

    if (!menu) {
      menu = new foodMenu({
        breakfast: { date: new Date(), items: breakfast },
        lunch: { date: new Date(), items: lunch },
        dinner: { date: new Date(), items: dinner },
      });
    } else {
      const now = new Date();

      if (breakfast.length) {
        menu.breakfast.items.push(...breakfast);
        menu.breakfast.date = now;
      }

      if (lunch.length) {
        menu.lunch.items.push(...lunch);
        menu.lunch.date = now;
      }

      if (dinner.length) {
        menu.dinner.items.push(...dinner);
        menu.dinner.date = now;
      }
    }

    await menu.save();

    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to update menu",
      details: err.message,
    });
  }
});

export default router;
