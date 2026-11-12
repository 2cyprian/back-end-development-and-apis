export function authorizeModification(req, res, next) {
  const { role, id } = req.user;
  if (role === "parent") return next();
  if (role === "child" && Number(req.params.userId) === Number(id)) return next();
  return res.status(403).json({ error: "Access denied" });
}