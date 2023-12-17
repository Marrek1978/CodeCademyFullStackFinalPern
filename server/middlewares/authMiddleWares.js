const ensureAuthed = (req, res, next) => {
  if (req.isAuthenticated() || req.session.isLoggedIn) return next();
  res.status(401).json({ type: "notAuthed", error: "Not authenticated" });
};

const ensureNotAuthed = (req, res, next) => {
  if (!req.isAuthenticated() && !req.session.isLoggedIn) return next();
  res.status(401).json({ type: "notAuthed", error: "Currently authenticated" });
};

export { ensureAuthed, ensureNotAuthed };
