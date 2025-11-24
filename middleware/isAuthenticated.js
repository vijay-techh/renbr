import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function isAuthenticated(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const [, token] = header.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}
