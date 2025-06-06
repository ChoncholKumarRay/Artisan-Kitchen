import { Schema, model } from "mongoose";

const foodItemsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image_id: { type: String, required: true },
    actual_price: { type: Number, required: true },
    discount: { type: Number, required: true },
    price: { type: Number, required: true },
    label: { type: String },
    esteemed_time: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model("foodItem", foodItemsSchema, "food_items");
