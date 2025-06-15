import { Router } from "express";
import foodItem from "../models/foodItem.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = Router();

// POST /api/food/item
router.post("/item", async (req, res) => {
  const { item_id } = req.body;

  try {
    const item = await foodItem.findById(item_id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    res.json({
      item_id: item._id,
      title: item.title,
      description: item.description,
      image_url: item.image_url,
      actual_price: item.actual_price,
      discount: item.discount,
      price: item.price,
      esteemed_time: item.esteemed_time,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// GET /api/food/
router.get("/", adminAuth, async (req, res) => {
  try {
    const items = await foodItem.find({});
    res.status(200).json({
      success: true,
      items,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch food items",
      details: err.message,
    });
  }
});

// POST /api/food/add
router.post("/add", adminAuth, async (req, res) => {
  const {
    title,
    description,
    image_url,
    actual_price,
    discount,
    price,
    label,
    esteemed_time,
  } = req.body;

  try {
    const newItem = new foodItem({
      title,
      description,
      image_url,
      actual_price,
      discount,
      price,
      label,
      esteemed_time,
    });

    await newItem.save();

    res
      .status(201)
      .json({ success: true, message: "Food item added successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to add item",
      details: err.message,
    });
  }
});

// POST /api/food/remove
router.post("/remove", adminAuth, async (req, res) => {
  const { item_id } = req.body;

  if (!item_id) {
    return res.status(400).json({
      success: false,
      error: "item_id is required",
    });
  }

  try {
    const deleted = await foodItem.findByIdAndDelete(item_id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Food item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item removed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to remove item",
      details: err.message,
    });
  }
});

export default router;
