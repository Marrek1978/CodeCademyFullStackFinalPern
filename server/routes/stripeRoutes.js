import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Mr2XVAhpVvmqSVAfj2ttJJvjQo06aQVTiHUgxqzdrEf0ct6xnrMBsq5SCTu3c5xw40izJgNznaRCCTKnvVDjxrt00P6q1Pdt5"
);
import { ensureAuthed } from "../middlewares/authMiddleWares.js";

import { productCodes } from "./productCodes.js";

const YOUR_DOMAIN = "http://localhost:5173";

const stripeRoutes = (app) => {
  //should be post
  app.post("/create-checkout-session", ensureAuthed, async (req, res) => {
    const curProdPriceCode = productCodes.find((prod) => {
      return prod.productNum === req.body.subscriptionId;
    }).stripeCode; // does it exist?

    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: curProdPriceCode,
            quantity: 1,
          },
        ],
        mode: "subscription",
        return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      });

      res.send({ clientSecret: session.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/session-status", ensureAuthed, async (req, res) => {
    console.log("in session status");
    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
      );
      // Retrieve the subscription object
      const subscriptionId = session.subscription;
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      // Retrieve the product ID from subscription items
      //  const productIds = subscription.items.data.map(item => item.price.product);
      const productFrequency = productCodes.find((prod) => {
        return prod.stripeCode === subscription.plan.id;
      }).frequency; // does it exist?

      console.log("in session status and returning data");
      res.send({
        status: session.status,
        customer_email: session.customer_details.email,
        subFrequency: productFrequency,
      });
    } catch (error) {
      console.log("error in session status", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error in session status" });
      }
    }
  });
};

export default stripeRoutes;
