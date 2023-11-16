const testRoutes = (app) => {
  
  app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
};

export default testRoutes;
