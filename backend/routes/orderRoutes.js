import { Router } from "express";
import Order from "../models/order.js";
import foodItem from "../models/foodItem.js";

const router = Router();

// POST /api/order
router.post("/", async (req, res) => {
  const {
    user_id,
    breakfast_items = [],
    lunch_items = [],
    dinner_items = [],
  } = req.body;

  if (
    !user_id ||
    (!breakfast_items.length && !lunch_items.length && !dinner_items.length)
  ) {
    return res.status(400).json({
      success: false,
      error: "user_id and at least one of the meal items is required",
    });
  }

  try {
    let total_price = 0;

    const allItems = [...breakfast_items, ...lunch_items, ...dinner_items];

    for (const { item_id, quantity } of allItems) {
      const item = await foodItem.findById(item_id);
      if (!item) {
        return res.status(404).json({
          success: false,
          error: `Item not found for ID: ${item_id}`,
        });
      }
      total_price += item.price * quantity;
    }

    const newOrder = new Order({
      user_id,
      breakfast_items,
      lunch_items,
      dinner_items,
      total_price,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order_id: newOrder._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to place order",
      details: err.message,
    });
  }
});

export default router;
