import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

/**
 * Detects return from Stripe Payment Link and clears the cart.
 *
 * How it works:
 *  - Before leaving for Stripe, Checkout.tsx sets "stripe_checkout_pending"
 *    in sessionStorage.
 *  - This hook runs on every route change. If the flag is present and the
 *    user is no longer on /checkout (they came back from Stripe), we clear
 *    the cart and redirect to the success page.
 *
 * Note: We intentionally don't check document.referrer because browsers
 * suppress it on cross-origin redirects (Stripe → your site), making it
 * unreliable.
 */
const useStripeReturn = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pending = sessionStorage.getItem("stripe_checkout_pending");
    if (!pending) return;

    // Still on the checkout form — user hasn't left yet
    if (location.pathname === "/checkout") return;

    // User is back on our site after visiting Stripe — clear cart
    sessionStorage.removeItem("stripe_checkout_pending");
    clearCart();

    // Redirect to success page if not already there
    if (location.pathname !== "/checkout/success") {
      navigate("/checkout/success", { replace: true });
    }
  }, [location.pathname]);
};

export default useStripeReturn;
