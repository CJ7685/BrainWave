import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";   // db.ts must `export default connectDB`
import authRoutes from "./routes/auth"; // auth.ts must `export default router`
import protectedRoutes from "./routes/protected";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("BrainWave Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
