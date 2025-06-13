import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import foodRoutes from "./routes/foodRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());

app.use("/api/food", foodRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
