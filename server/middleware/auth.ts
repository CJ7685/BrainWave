import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request type to include userId
interface AuthRequest extends Request {
  userId?: string;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token"); // client should send this header

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: string };
    req.userId = decoded.id;
    next(); // allow access
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
