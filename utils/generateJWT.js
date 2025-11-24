import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
