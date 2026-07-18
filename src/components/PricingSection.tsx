import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Check,
  ShoppingCart,
  Zap,
  TrendingUp,
  Crown,
  ArrowRight,
  Linkedin,
  Megaphone,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { getPaymentItemKey } from "@/lib/payment";

type FeatureItem = {
  title: string;
};

type PricingButton = {
  label: string;
  url: string;
  targetBlank: boolean;
};

type PricingCard = {
  badge?: string;
  title: string;
  subtitle: string;
  price: number;
  duration?: string;
  theme: string;
  icon: string;
  priceId: string;   // Add this
  feature_list: {
    title: string;
  }[];
  button?: {
    label: string;
    url: string;
    targetBlank: boolean;
  };
};

type PricingSectionData = {
  eyebrow?: string;
  title?: string;
  highlight_title?: string;
  description?: any;
  bottom_text?: string;
  pricing_cards: PricingCard[];
};

interface Props {
  data?: PricingSectionData;
}

const getRichText = (content: any): string => {
  if (!content) return "";

  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .flatMap((block: any) => block.children || [])
      .map((child: any) => child.text || "")
      .join("");
  }

  return "";
};

const PricingSection = ({ data }: Props) => {
  if (!data) return null;

  const { addToCart, cartCount, items } = useCart();
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const iconMap = {
  zap: Zap,
  "trending-up": TrendingUp,
  crown: Crown,
  linkedin: Linkedin,
  megaphone: Megaphone,
  "bar-chart": BarChart3,
};

const themeMap = {
  blue: {
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30 hover:border-blue-500/60",
  },

  orange: {
    color: "from-primary/20 to-primary/10",
    border: "border-primary/60 hover:border-primary",
  },

  purple: {
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/30 hover:border-purple-500/60",
  },

  cyan: {
    color: "from-blue-400/20 to-cyan-500/10",
    border: "border-cyan-500/30 hover:border-cyan-500/60",
  },

  pink: {
    color: "from-pink-500/20 to-orange-500/10",
    border: "border-pink-500/30 hover:border-pink-500/60",
  },

  green: {
    color: "from-green-500/20 to-emerald-600/10",
    border: "border-green-500/30 hover:border-green-500/60",
  },
};

const packages = data?.pricing_cards || [];

  const handleAddToCart = (pkg: PricingCard, index: number) => {
  const packageKey = getPaymentItemKey({
    id: pkg.title,
    name: pkg.title,
  });

  addToCart({
    id: packageKey,
    name: pkg.title,
    price: Number(pkg.price),
    billing: "monthly",
    priceId: pkg.priceId || packageKey,
  });
};

  const handleBuyNow = (pkg: PricingCard, index: number) => {
  const packageKey = getPaymentItemKey({
    id: pkg.title,
    name: pkg.title,
  });

  navigate("/checkout", {
    state: {
      buyNowItem: {
        id: packageKey,
        name: pkg.title,
        price: Number(pkg.price),
        billing: "monthly",
        priceId: pkg.priceId || packageKey,
      },
    },
  });
};

  return (
    <section id="pricing" className="py-6 lg:py-12" ref={ref}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {data.eyebrow && (
  <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
    {data.eyebrow}
  </span>
)}

<h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
  {data.title}{" "}
  <span className="gradient-text">
    {data.highlight_title}
  </span>
</h2>

<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
  {getRichText(data.description)}
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

        {/* Pricing cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, i) => {
            console.log("Feature List:", pkg.feature_list);
            const Icon =
  iconMap[pkg.icon as keyof typeof iconMap] || Zap;

const theme =
  themeMap[pkg.theme as keyof typeof themeMap] ||
  themeMap.blue;
            const packageKey = getPaymentItemKey({
              id: pkg.title,
              name: pkg.title,
            });
            const isAdded = items.some(
  (item) => item.id === packageKey
);
            const isPopular = pkg.badge === "Most Popular";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
               className={`relative flex flex-col rounded-2xl border bg-card ${theme.border} transition-all duration-300 ${
                  isPopular ? "ring-2 ring-primary/40 md:scale-105" : ""
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

                {/* Card header */}
                <div className={`p-6 rounded-t-2xl bg-gradient-to-br ${theme.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-background/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-foreground">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{pkg.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-display font-extrabold text-foreground">
                     ${Number(pkg.price).toLocaleString()}
                    </span>
                    <span className="text-muted-foreground mb-1">/ {pkg.duration || "mo"}</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  <ul className="space-y-2.5 flex-1 mb-6">
                   {pkg.feature_list?.map((feature, index) => (
  <li
    key={index}
    className="flex items-start gap-2.5 text-sm text-foreground"
  >
    <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
    {feature.title}
  </li>
))}
                    
                  </ul>

                  <div className="flex flex-col gap-3">
                    {/* <button
                      onClick={() => handleBuyNow(pkg, i)}
                      className={`w-full py-3 px-6 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        isPopular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-button"
                          : "bg-foreground text-background hover:bg-foreground/90"
                      }`}
                    >
                      Buy Now
                      <ArrowRight className="w-4 h-4" />
                    </button> */}

                    <button
                     onClick={() => handleAddToCart(pkg, i)}
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
          })}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-14 text-sm text-muted-foreground"
        >
          {(data.bottom_text || "")
  .split("|")
  .map((badge, index) => (
            <span key={index} className="flex items-center gap-6 px-4 py-2  roundedfull text-sm  borner border-border">{badge.trim()}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
