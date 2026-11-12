import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import { getWatchlist, addMovie, updateMovie, deleteMovie } from "../utils/db.js";

const router = express.Router();

router.get("/:userId", authenticate, (req, res) => {
  const watchlist = getWatchlist(Number(req.params.userId));
  if (watchlist === null) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ watchlist });
});

router.post("/:userId/movies", authenticate, authorizeModification, (req, res) => {
  const movie = addMovie(Number(req.params.userId), req.body);
  if (movie === null) return res.status(404).json({ error: "User not found" });
  res.status(201).json({ movie });
});

router.put("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res) => {
  const movie = updateMovie(Number(req.params.userId), Number(req.params.movieId), req.body);
  if (movie === null) return res.status(404).json({ error: "User or movie not found" });
  res.status(200).json({ movie });
});

router.delete("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res) => {
  const ok = deleteMovie(Number(req.params.userId), Number(req.params.movieId));
  if (ok === null) return res.status(404).json({ error: "User or movie not found" });
  res.status(200).json({ message: "Movie removed" });
});

export default router;