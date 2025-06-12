import { Router } from "express";
import User from "../models/user.js";
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

    await User.findByIdAndUpdate(user_id, {
      $push: { order_list: newOrder._id },
    });

    res.status(201).json({
      success: true,
      message: "Order initiated successfully",
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

router.post("/checkout", async (req, res) => {
  const { order_id, name, phone, email, delivery_point } = req.body;

  if (!order_id || !name || !phone || !email || !delivery_point) {
    return res.status(400).json({
      success: false,
      error: "order_id, name, phone, email, and delivery_point are required",
    });
  }

  try {
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    const delivery_charge = 30;
    const payable_amount = order.total_price + delivery_charge;

    order.name = name;
    order.phone = phone;
    order.email = email;
    order.delivery_point = delivery_point;
    order.delivery_charge = delivery_charge;
    order.payable_amount = payable_amount;

    order.order_status.push({
      status: "Placed",
      time: new Date(),
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Placed Successfully!",
      payable_amount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to update order",
      details: err.message,
    });
  }
});

// API endpoint to check order status
router.post("/status", async (req, res) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).json({
      success: false,
      error: "order_id is required",
    });
  }

  try {
    const order = await Order.findById(order_id).select(
      "order_status payable_amount"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order_status: order.order_status,
      payable_amount: order.payable_amount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch order status",
      details: err.message,
    });
  }
});

export default router;
