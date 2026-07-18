import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ShoppingCart, Zap, TrendingUp, Crown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { getPaymentItemKey } from "@/lib/payment";

const packages = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for small businesses",
    price: 499,
    billing: "monthly" as const,
    priceId: "starter",
    icon: Zap,
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30 hover:border-blue-500/60",
    badge: null,
    features: [
      "5 Target Keywords",
      "On-Page SEO Optimization",
      "Google Business Profile Setup",
      "Monthly Rankings Report",
      "Basic Technical SEO Audit",
      "XML Sitemap & Robots.txt",
      "Meta Tags Optimization",
      "Email Support (48h response)",
    ],
    notIncluded: [
      "Content Creation",
      "Link Building",
      "Competitor Analysis",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For businesses ready to scale",
    price: 999,
    billing: "monthly" as const,
    priceId: "growth",
    icon: TrendingUp,
    color: "from-primary/20 to-primary/10",
    border: "border-primary/60 hover:border-primary",
    badge: "Most Popular",
    features: [
      "15 Target Keywords",
      "Everything in Starter",
      "Content Strategy (2 articles/mo)",
      "Link Building (5 backlinks/mo)",
      "Competitor Analysis",
      "Core Web Vitals Optimization",
      "Weekly Progress Reports",
      "Schema Markup Implementation",
      "Priority Email & Chat Support",
    ],
    notIncluded: [
      "Dedicated SEO Manager",
    ],
  },
  {
    id: "dominator",
    name: "Dominator",
    tagline: "Full-service SEO domination",
    price: 1999,
    billing: "monthly" as const,
    priceId: "dominator",
    icon: Crown,
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/30 hover:border-purple-500/60",
    badge: "Best Results",
    features: [
      "Unlimited Keywords",
      "Everything in Growth",
      "Content Creation (8 articles/mo)",
      "Premium Link Building (20 backlinks/mo)",
      "Technical SEO Overhaul",
      "Dedicated SEO Manager",
      "Daily Monitoring & Alerts",
      "Conversion Rate Optimization",
      "Monthly Strategy Calls",
      "24/7 Priority Support",
    ],
    notIncluded: [],
  },
];

const PackageCard = ({
  pkg,
  index,
  isAdded,
  onAddToCart,
  onBuyNow,
}: {
  pkg: (typeof packages)[0];
  index: number;
  isAdded: boolean;
  onAddToCart: (pkg: (typeof packages)[0]) => void;
  onBuyNow: (pkg: (typeof packages)[0]) => void;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = pkg.icon;
  const isPopular = pkg.badge === "Most Popular";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl border bg-card ${pkg.border} transition-all duration-300 ${
        isPopular ? "ring-2 ring-primary/40 scale-105" : ""
      }`}
    >
      {pkg.badge && (
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
            isPopular
              ? "bg-primary text-primary-foreground"
              : "bg-purple-500 text-white"
          }`}
        >
          {pkg.badge}
        </div>
      )}

      <div className={`p-6 rounded-t-2xl bg-gradient-to-br ${pkg.color}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-background/40 flex items-center justify-center">
            <Icon className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-foreground">{pkg.name}</h3>
            <p className="text-xs text-muted-foreground">{pkg.tagline}</p>
          </div>
        </div>

        <div className="flex items-end gap-1">
          <span className="text-4xl font-display font-extrabold text-foreground">
            ${pkg.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground mb-1">/ mo</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <ul className="space-y-2.5 flex-1 mb-6">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
              <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
          {pkg.notIncluded.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground/50 line-through">
              <span className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground/30">✕</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => onBuyNow(pkg)}
            className={`w-full py-3 px-6 rounded-xl text-sm font-bold transition-all duration-200 ${
              isPopular
                ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-button"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            Buy Now
            <ArrowRight className="inline w-4 h-4 ml-2" />
          </button>

          <button
            onClick={() => onAddToCart(pkg)}
            disabled={isAdded}
            className={`w-full py-3 px-6 rounded-xl text-sm font-semibold border transition-all duration-200 flex items-center justify-center gap-2 ${
              isAdded
                ? "cursor-not-allowed border-green-500 text-green-400 bg-green-500/10"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdded ? "Already in Cart ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Packages = () => {
  const { addToCart, cartCount, items } = useCart();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const handleAddToCart = (pkg: (typeof packages)[0]) => {
    const packageKey = getPaymentItemKey({ id: pkg.priceId, name: pkg.name });

    addToCart({
      id: packageKey,
      name: pkg.name,
      price: pkg.price,
      billing: pkg.billing,
      priceId: packageKey,
    });
  };

  const handleBuyNow = (pkg: (typeof packages)[0]) => {
    const packageKey = getPaymentItemKey({ id: pkg.priceId, name: pkg.name });

    addToCart({
      id: packageKey,
      name: pkg.name,
      price: pkg.price,
      billing: pkg.billing,
      priceId: packageKey,
    });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-32">
        <div className="section-container">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              Pricing Plans
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
              Choose Your{" "}
              <span className="gradient-text">Growth Package</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent, results-driven SEO packages. No hidden fees, no long-term contracts required. Cancel anytime.
            </p>

            {cartCount > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => navigate("/cart")}
                className="mt-6 inline-flex items-center gap-2 bg-primary/10 border border-primary/40 text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/20 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                View Cart ({cartCount} item{cartCount > 1 ? "s" : ""})
              </motion.button>
            )}
          </motion.div>

          {/* Package Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={i}
                isAdded={items.some((item) => item.id === getPaymentItemKey({ id: pkg.priceId, name: pkg.name }))}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-14 text-sm text-muted-foreground"
          >
            {[
              "✓ Cancel anytime",
              "✓ No setup fees",
              "✓ Secure payment via Razorpay",
              "✓ Results guaranteed",
              "✓ 30-day money-back",
            ].map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Packages;
