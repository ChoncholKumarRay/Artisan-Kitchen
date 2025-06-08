import { Router } from "express";
import foodItem from "../models/foodItem.js";

const router = Router();

// POST /api/food/item
router.post("/item", async (req, res) => {
  const { item_id } = req.body;
  console.log("Request Body:", req.body);

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

router.post("/add", async (req, res) => {
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

export default router;
