import { ensureAuthed } from "../middlewares/authMiddleWares.js";
import {
  getUserDataById,
  postUserDataById,
  postUserCCDataById,
  getUserCardDataById,
} from "../dbQueries/userQueries.js";

const userRoutes = (app) => {
  //ensure authed
  app.get("/user/:userId", ensureAuthed, async (req, res) => {
    try {
      const userData = await getUserDataById(req.params.userId);
      if (!userData)
        return res
          .status(404)
          .json({ type: "noUser", error: "User not found" });
      res.send({ user: userData });
    } catch (error) {
      res.status(500).json({ type: "serverError", error: error.message });
    }
  });

  app.post("/user/:userId", ensureAuthed, async (req, res) => {
    const id = req.body.id;
    const email = req.body.data.email;
    const password = req.body.data.password; //!  deal iwth this later
    const firstname = req.body.data.firstname;
    const lastname = req.body.data.lastname;
    const address = req.body.data.address;
    const phone = req.body.data.phone;
    try {
      const response = await postUserDataById(
        id,
        email,
        password,
        firstname,
        lastname,
        address,
        phone
      );
      res.send({ user: response });
    } catch (error) {
      res.status(500).json({ type: "notAuthed", error: error.message });
    }
  });

  app.get("/user/:userId/card", ensureAuthed, async (req, res) => {
    try {
      const userCCData = await getUserCardDataById(req.params.userId);
      res.send({ userCCData });
    } catch (error) {
      res.status(500).json({ type: "serverError", error: error.message });
    }
  });

  app.post("/user/:userId/card", ensureAuthed, async (req, res) => {
    const id = req.body.id;
    const cardNumber = req.body.data.cardnumber;
    const expirationDate = req.body.data.expirationdate;
    const cvv = req.body.data.cvv;
    try {
      const response = await postUserCCDataById(
        id,
        cardNumber,
        expirationDate,
        cvv
      );
      res.send({ user: response });
    } catch (error) {
      res.status(500).json({ type: "notAuthed", error: error.message });
    }
  });


  app.get("/user/:userId/subscriptions", ensureAuthed, async (req, res) => {
    try {
      // const userSub = await submitUserSubscripitonById(req.params.userId);
      const userSub = 'monthly';
      if (!userSub)
        return res
          .status(404)
          .json({ type: "noUser", error: "User not found" });
      res.send({ subscription: userSub });
    } catch (error) {
      res.status(500).json({ type: "serverError", error: error.message });
    }
  });

  app.post("/user/:userId/subscriptions", ensureAuthed, async (req, res) => {
    try {
      //post user subscription after stripe payment
      res.send({ subscription: 'monthly' });
    } catch (error) {
      res.status(500).json({ type: "serverError", error: error.message });
    }
  });


};

export default userRoutes;
