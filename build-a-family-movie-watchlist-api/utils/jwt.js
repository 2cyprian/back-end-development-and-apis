import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "movie-watchlist-secret";

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}