const ensureAuthed = (req, res, next) => {
  if (req.isAuthenticated() || req.session.isLoggedIn) return next();
  res.status(401).json({ message: "Not authenticated" });
};

export default ensureAuthed;
