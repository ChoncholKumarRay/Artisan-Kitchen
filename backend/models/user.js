import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, default: "user" },
  phone: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  address: { type: String },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  order_list: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export default model("User", userSchema, "users");
