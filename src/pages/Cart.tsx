import { motion } from "framer-motion";
import { ShoppingCart, Trash2, ArrowLeft, ArrowRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-32">
        <div className="section-container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <ShoppingCart className="w-7 h-7 text-primary" />
              <h1 className="font-display text-3xl font-bold">Your Cart</h1>
            </div>

            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <Package className="w-16 h-16 text-muted-foreground/30 mb-5" />
                <h2 className="text-xl font-semibold text-muted-foreground mb-2">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground/70 mb-6 text-sm">
                  Browse our SEO packages and add one to get started.
                </p>
                <button
                  onClick={() => navigate({ pathname: "/", hash: "#pricing" })}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  View Packages
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {/* Cart items */}
                <div className="md:col-span-2 space-y-4">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between p-5 rounded-xl border border-border bg-card"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {item.name} Plan
                          </p>
                          <p className="text-sm text-muted-foreground">
                            SEO Package · Billed {item.billing}
                          </p>
                          <p className="text-sm text-primary font-bold mt-1">
                            ${item.price.toLocaleString()} / mo
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <button
                    onClick={() => navigate({ pathname: "/", hash: "#pricing" })}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Continue Shopping
                  </button>
                </div>

                {/* Order summary */}
                <div className="md:col-span-1">
                  <div className="rounded-xl border border-border bg-card p-6 sticky top-28">
                    <h2 className="font-display font-bold text-lg mb-4">
                      Order Summary
                    </h2>

                    <div className="space-y-3 text-sm mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span className="text-muted-foreground">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4 mb-6">
                      <div className="flex justify-between font-bold text-foreground">
                        <span>Total / mo</span>
                        <span className="text-primary text-lg">
                          ${cartTotal.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Billed monthly. Cancel anytime.
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/checkout")}
                      className="glow-button w-full bg-primary text-primary-foreground py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={clearCart}
                      className="w-full text-center text-xs text-muted-foreground hover:text-red-400 transition-colors mt-4"
                    >
                      Clear cart
                    </button>

                    <div className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground space-y-1.5">
                      <p>🔒 Secure checkout powered by Razorpay</p>
                      <p>✓ 256-bit SSL encryption</p>
                      {/* <p>✓ 30-day money-back guarantee</p> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
