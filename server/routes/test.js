const testRoutes = (app) => {

  console.log('test routes')

  app.get("/api", (req, res) => {
    console.log("in test route");
    res.json({ message: "Hello from server!" });
  });
};

export default testRoutes;
