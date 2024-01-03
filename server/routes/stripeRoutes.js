import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Mr2XVAhpVvmqSVAfj2ttJJvjQo06aQVTiHUgxqzdrEf0ct6xnrMBsq5SCTu3c5xw40izJgNznaRCCTKnvVDjxrt00P6q1Pdt5"
);

const YOUR_DOMAIN = "http://localhost:5173";

const stripeRoutes = (app) => {
  //should be post
  app.post("/create-checkout-session", async (req, res) => {
    console.log("in create checkout session");
    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded",
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1OOtGCAhpVvmqSVARw0C8XHe",
            quantity: 1,
          },
        ],
        mode: "payment",
        return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      });

      res.send({ clientSecret: session.client_secret });
    } catch (error) {
      console.log("🚀 ~ file: stripeRoutes.js:28 ~ app.get ~ error", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/session-status", async (req, res) => {
    console.log("in session status");
    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
      );

      res.send({
        status: session.status,
        customer_email: session.customer_details.email,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default stripeRoutes;
