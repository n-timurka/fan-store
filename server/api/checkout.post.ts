import { useServerStripe } from "#stripe/server";
import type { CartItem } from "~/types/cartItem";

export default defineEventHandler(async (event) => {
  // Get the data from the request body
  const { products, data } = await readBody(event);

  // Create an order and save to DB
  console.log(data);

  // Create Stripe object
  const stripe = await useServerStripe(event);

  try {
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((item: CartItem) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.product.name,
            images: item.product.images, // Product image
          },
          unit_amount: Math.round(item.product.price * 100), // Amount in cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
    });

    // Return session id to the client
    return { sessionId: session.id };
  } catch (error) {
    return { error: (error as Error).message };
  }
});
