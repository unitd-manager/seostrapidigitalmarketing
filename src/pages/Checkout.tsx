import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Lock, ArrowLeft, CreditCard, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart, type CartItem } from "@/context/CartContext";
import {
  getPaymentButtonLabel,
  getPaymentItemKey,
  getPaymentProvider,
  getPaymentProviderName,
} from "@/lib/payment";

interface BillingForm {
  name: string;
  email: string;
  company: string;
  country: string;
}

type CheckoutState = {
  buyNowItem?: Omit<CartItem, "quantity">;
};

type RazorpayOrderItem = {
  key: string;
  title: string;
  quantity: number;
  unitAmountMajor: number;
  lineAmountMajor: number;
  duration: string;
};

type CreateOrderResponse = {
  checkoutReference: string;
  recordId: string;
  key: string;
  currency: string;
  amount: number;
  amountMajor: number;
  orderId: string;
  customer: BillingForm;
  items: RazorpayOrderItem[];
};

type VerifyPaymentResponse = {
  verified: boolean;
  checkoutReference: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amountMinor: number;
  amountMajor: number | string;
  currency: string;
  items: RazorpayOrderItem[];
  customerName: string;
  customerEmail: string;
};

type RazorpaySuccessPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailurePayload = {
  error?: {
    description?: string;
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
  handler: (response: RazorpaySuccessPayload) => void | Promise<void>;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (eventName: string, handler: (payload: RazorpayFailurePayload) => void) => void;
    };
  }
}

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

const loadRazorpayScript = () =>
  new Promise<void>((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Razorpay SDK.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK."));
    document.body.appendChild(script);
  });

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const buyNowItem = (location.state as CheckoutState | null)?.buyNowItem;
  const checkoutItems: CartItem[] = (buyNowItem ? [{ ...buyNowItem, quantity: 1 }] : items).map(
    (item) => ({
      ...item,
      id: getPaymentItemKey(item),
      priceId: item.priceId || getPaymentItemKey(item),
    })
  );
  const checkoutTotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const paymentProvider = getPaymentProvider();
  const paymentProviderName = getPaymentProviderName(paymentProvider);

  const [form, setForm] = useState<BillingForm>({
    name: "",
    email: "",
    company: "",
    country: "US",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in your name and email before continuing.");
      return;
    }

    if (!STRAPI_URL) {
      setError("VITE_STRAPI_URL is not configured.");
      return;
    }

    setIsSubmitting(true);
    try {
      await loadRazorpayScript();

      const createOrderResponse = await fetch(`${STRAPI_URL}/api/checkout/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          order: {
            items: checkoutItems.map((item) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
            })),
            sourcePage: "home",
            successUrl: `${window.location.origin}/checkout/success`,
            cancelUrl: `${window.location.origin}/checkout`,
          },
        }),
      });

      const createOrderResult = (await createOrderResponse.json()) as {
        data?: CreateOrderResponse;
        error?: { message?: string };
      };

      if (!createOrderResponse.ok || !createOrderResult.data) {
        throw new Error(
          createOrderResult.error?.message || "Could not create a Razorpay order."
        );
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK is unavailable.");
      }

      const orderData = createOrderResult.data;
      sessionStorage.setItem("razorpay_checkout_pending", "1");
      sessionStorage.setItem(
        "razorpay_checkout_customer",
        JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          country: form.country,
          itemName: orderData.items.map((item) => item.title).join(", "),
          checkoutReference: orderData.checkoutReference,
        }),
      );

      const razorpay = new window.Razorpay({
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SEO StraPi Digital",
        description: orderData.items.map((item) => item.title).join(", "),
        order_id: orderData.orderId,
        prefill: {
          name: form.name,
          email: form.email,
        },
        notes: {
          checkoutReference: orderData.checkoutReference,
        },
        theme: {
          color: "#8b5cf6",
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch(`${STRAPI_URL}/api/checkout/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                checkoutReference: orderData.checkoutReference,
                ...response,
              }),
            });

            const verifyResult = (await verifyResponse.json()) as {
              data?: VerifyPaymentResponse;
              error?: { message?: string };
            };

            if (!verifyResponse.ok || !verifyResult.data?.verified) {
              throw new Error(
                verifyResult.error?.message || "Payment verification failed."
              );
            }

            sessionStorage.setItem(
              "razorpay_checkout_success",
              JSON.stringify(verifyResult.data)
            );
            sessionStorage.removeItem("razorpay_checkout_pending");

            navigate(
              `/checkout/success?checkout_reference=${encodeURIComponent(
                orderData.checkoutReference
              )}&razorpay_payment_id=${encodeURIComponent(
                verifyResult.data.razorpayPaymentId
              )}`
            );
          } catch (verificationError) {
            setError(
              verificationError instanceof Error
                ? verificationError.message
                : "Payment verification failed."
            );
          } finally {
            setIsSubmitting(false);
          }
        },
      });

      razorpay.on("payment.failed", (payload) => {
        setError(payload.error?.description || "Razorpay payment failed.");
        setIsSubmitting(false);
      });

      razorpay.open();
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Could not start Razorpay checkout."
      );
      setIsSubmitting(false);
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-28 pb-32 flex items-center justify-center">
          <div className="text-center">
            <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">Cart is empty</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Add a package first before checking out.
            </p>
            <button
              onClick={() => navigate({ pathname: "/", hash: "#pricing" })}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm"
            >
              Browse Packages
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-32" ref={ref}>
        <div className="section-container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => navigate(buyNowItem ? { pathname: "/", hash: "#pricing" } : "/cart")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {buyNowItem ? "Back to Pricing" : "Back to Cart"}
            </button>

            <h1 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
              <Lock className="w-7 h-7 text-primary" />
              Secure Checkout
            </h1>

            {/* Setup instructions banner */}
            {!STRAPI_URL && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-5 mb-6 text-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="font-semibold text-yellow-300">
                    Action required: connect the frontend to Strapi
                  </p>
                </div>
                <ol className="text-yellow-200/80 space-y-1.5 pl-8 list-decimal">
                  <li>Set <code className="bg-yellow-500/20 px-1.5 py-0.5 rounded text-xs">VITE_STRAPI_URL</code> to your Strapi backend URL.</li>
                  <li>Make sure the backend <code className="bg-yellow-500/20 px-1.5 py-0.5 rounded text-xs">/api/checkout/create-order</code> endpoint is available.</li>
                </ol>
              </motion.div>
            )}

            <div className="grid md:grid-cols-5 gap-8">
              {/* Billing form */}
              <form
                onSubmit={handleCheckout}
                className="md:col-span-3 space-y-5"
              >
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-semibold text-base mb-5 text-foreground">
                    Billing Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-1.5" htmlFor="name">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/60 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-1.5" htmlFor="email">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/60 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-1.5" htmlFor="company">
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corp (optional)"
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/60 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-muted-foreground mb-1.5" htmlFor="country">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/60 transition"
                      >
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IN">India</option>
                        <option value="SG">Singapore</option>
                        <option value="AE">UAE</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold text-base text-foreground">
                      Payment
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your order is created dynamically in Strapi and then completed in the secure Razorpay checkout modal. We never store your card details.
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-red-500/40 bg-red-500/10"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">{error}</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glow-button w-full bg-primary text-primary-foreground py-4 px-8 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:bg-primary/90 transition-all"
                >
                  <Lock className="w-5 h-5" />
                  {isSubmitting ? "Processing..." : getPaymentButtonLabel(paymentProvider, checkoutTotal)}
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </button>
              </form>

              {/* Order summary sidebar */}
              <div className="md:col-span-2">
                <div className="rounded-xl border border-border bg-card p-6 sticky top-28">
                  <h2 className="font-display font-bold text-base mb-5">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-4">
                    {checkoutItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} Plan × {item.quantity}
                        </span>
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 mb-5">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary text-lg">
                        ${checkoutTotal.toLocaleString()} / mo
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recurring monthly subscription
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                      256-bit SSL encryption
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                      PCI DSS compliant via Razorpay
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                      30-day money-back guarantee
                    </div> */}
                    {/* <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                      Cancel subscription anytime
                    </div> */}
                  </div>

                  <div className="mt-5 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground/60 text-center">
                      Powered by{" "}
                      <span className="text-muted-foreground font-medium">{paymentProviderName}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
