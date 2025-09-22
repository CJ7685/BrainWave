import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import User from "../models/User";

const router = express.Router();

router.get("/profile", auth, async (req: Request & { userId?: string }, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // exclude password
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
