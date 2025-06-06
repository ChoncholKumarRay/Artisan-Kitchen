import mongoose from "mongoose";

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

export default connectDB;
