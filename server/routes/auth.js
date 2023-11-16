const routes = (app) => {
  app.get("/register", async (req, res) => {
    console.log(" in register route");
    res.send("registered");
  });
};

export default routes;
