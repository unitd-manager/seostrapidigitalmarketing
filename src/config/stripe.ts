// ============================================================
// STRIPE CONFIGURATION
// Replace these values with your actual Stripe keys and Price IDs
// Get them from: https://dashboard.stripe.com
// ============================================================

export const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51TOCiEAUcMizv4AwedUonRvtQ9AluwaUDm4ERqORgLbzwg7T3Sn43tGvgUJboSIewjgXQevPF52UulTzVbIWO0FD00wsLf5YqP";

// Create products & prices in your Stripe Dashboard and paste the Price IDs here
export const STRIPE_PRICE_IDS = {
  starter: "price_1TOETmAUcMizv4AwiYrfVYxd",
  growth:  "price_1TOG0qAUcMizv4AwHTmxYnGB",
  dominator: "price_1TOG1OAUcMizv4Awr8X3KVvF",
};

// Optional: Replace with your Stripe Payment Links for a simpler flow
// Create at: https://dashboard.stripe.com/payment-links
export const STRIPE_PAYMENT_LINKS = {
  starter: "https://buy.stripe.com/test_8x2cN470M7u55zwd3seUU00",
  growth:  "https://buy.stripe.com/test_3cIaEW0CodSt9PM7J8eUU01",
  dominator: "https://buy.stripe.com/test_fZu00i1Gs8y9e62fbAeUU02",
};
