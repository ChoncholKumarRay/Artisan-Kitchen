import express from "express";
import mongoose from "mongoose";
import foodRoutes from "./routes/foodRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI =
  "mongodb+srv://chonchol:babBivUBi2CEXpPd@cluster0.b0oxdje.mongodb.net/artisan_kitchen?retryWrites=true&w=majority&appName=Cluster0";

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
