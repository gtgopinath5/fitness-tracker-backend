import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";

dotenv.config();

const app = express();

// Corrected CORS configuration to match frontend origin without trailing slash
app.use(cors({
  origin: 'https://fitness-tracker-frontend-vert.vercel.app', // No trailing slash
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", UserRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
});

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "hello developers from GFG"
    });
});

const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => {
            console.log("MongoDB connection error:", err);
        });
};

const startServer = async () => {
    try {
        connectDB();
        app.listen(8080, () => console.log("Server running at port 8080"));
    } catch (err) {
        console.log("Server start error:", err);
    }
};

startServer();
