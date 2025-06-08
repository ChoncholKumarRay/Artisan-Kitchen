import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    delivery_point: { type: String },
    breakfast_items: [
      {
        item_id: {
          type: Schema.Types.ObjectId,
          ref: "foodItem",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    lunch_items: [
      {
        item_id: {
          type: Schema.Types.ObjectId,
          ref: "foodItem",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    dinner_items: [
      {
        item_id: {
          type: Schema.Types.ObjectId,
          ref: "foodItem",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    total_price: { type: Number, default: 0 },
    delivery_charge: { type: Number, default: 0 },
    payable_amount: { type: Number, default: 0 },
    payment_status: {
      type: String,
      enum: ["Due", "Paid"],
      default: "Due",
    },
    method: {
      type: String,
      enum: ["COD"],
      default: "COD",
    },
    order_status: {
      type: String,
      enum: ["Placed", "Confirmed", "Paid", "Delivered"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

export default model("Order", orderSchema, "orders");
