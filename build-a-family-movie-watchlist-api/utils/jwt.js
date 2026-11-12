import jwt from "jsonwebtoken";

function secret() {
  return process.env.JWT_SECRET || "movie-watchlist-secret";
}

export function signToken(payload) {
  return jwt.sign(payload, secret(), { expiresIn: "1h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, secret());
  } catch {
    return null;
  }
}
