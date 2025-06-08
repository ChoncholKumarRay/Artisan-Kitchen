import { Schema, model } from "mongoose";

const itemSchema = new Schema(
  {
    date: { type: Date, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "foodItem" }],
  },
  { _id: false }
);

const foodMenuSchema = new Schema({
  breakfast: itemSchema,
  lunch: itemSchema,
  dinner: itemSchema,
});

export default model("foodMenu", foodMenuSchema, "food_menu");
