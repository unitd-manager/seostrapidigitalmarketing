import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, AlertCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getPaymentProviderName, getPaymentProvider } from "@/lib/payment";

type VerifiedCheckoutSuccess = {
  verified: boolean;
  checkoutReference: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId: string;
  amountMinor: number;
  amountMajor: number | string;
  currency: string;
  items?: Array<{ title: string }>;
  customerName?: string;
  customerEmail?: string;
};

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const checkoutReference = searchParams.get("checkout_reference");
  const sessionId = searchParams.get("session_id");
  const paymentProviderName = getPaymentProviderName(getPaymentProvider());
  const [verifiedCheckout, setVerifiedCheckout] = useState<VerifiedCheckoutSuccess | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "failed">("loading");
  const verificationStarted = useRef(false);

  useEffect(() => {
    if (verificationStarted.current) return;
    verificationStarted.current = true;

    if (!STRAPI_URL || !checkoutReference || !sessionId) {
      setVerificationStatus("failed");
      return;
    }

    const verifySession = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/checkout/verify-stripe-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutReference, sessionId }),
        });
        const result = await response.json() as {
          data?: VerifiedCheckoutSuccess;
          error?: { message?: string };
          message?: string;
        };

        if (!response.ok || !result.data?.verified) {
          throw new Error(result.error?.message || result.message || "Stripe could not verify this payment.");
        }
        setVerifiedCheckout(result.data);
        setVerificationStatus("success");
        clearCart();
      } catch {
        setVerificationStatus("failed");
      }
    };

    void verifySession();
  }, [checkoutReference, sessionId, clearCart]);

  const isVerifiedSuccess = verificationStatus === "success";
  const isVerifying = verificationStatus === "loading";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isVerifiedSuccess
                ? "bg-green-400/10 border border-green-400/30"
                : "bg-yellow-400/10 border border-yellow-400/30"
            }`}
          >
            {isVerifiedSuccess ? (
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            ) : (
              <AlertCircle className="w-10 h-10 text-yellow-400" />
            )}
          </motion.div>

          <h1 className="font-display text-4xl font-bold mb-4">
            {isVerifying ? "Confirming your payment…" : isVerifiedSuccess ? "Payment Successful!" : "Payment Not Completed"}
          </h1>
          {isVerifiedSuccess ? (
            <>
              <p className="text-muted-foreground mb-2">
                Thank you for your purchase. Your SEO campaign is now active.
              </p>
              <p className="text-sm text-muted-foreground/70 mb-8">
                {verifiedCheckout?.items?.length
                  ? `${verifiedCheckout.items.map((item) => item.title).join(", ")} was submitted through ${paymentProviderName}. Our team will reach out within 24 hours to get started.`
                  : `Your payment was submitted through ${paymentProviderName}. Our team will reach out within 24 hours to get started.`}
              </p>
              {(verifiedCheckout?.stripePaymentIntentId || sessionId) && (
                <p className="text-xs text-muted-foreground/60 mb-8">
                  Payment reference: {verifiedCheckout?.stripePaymentIntentId || sessionId}
                </p>
              )}
            </>
          ) : isVerifying ? (
            <>
              <p className="text-muted-foreground mb-2">Stripe is confirming your payment securely.</p>
              <p className="text-sm text-muted-foreground/70 mb-8">This usually takes only a moment. Please keep this page open.</p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground mb-2">We could not verify a successful Stripe payment for this visit.</p>
              <p className="text-sm text-muted-foreground/70 mb-8">
                Your cart is still saved. Please return to checkout and complete payment.
              </p>
            </>
          )}

          <button
            onClick={() => navigate(isVerifiedSuccess ? "/" : "/checkout")}
            className="glow-button inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold"
          >
            {isVerifiedSuccess ? "Back to Home" : "Return to Checkout"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
