import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { cartCount } = useCart();

  const navigate = useNavigate();

  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    const sections = navItems.map((item) =>
  document.getElementById(
    item.toLowerCase().replace(/\s+/g, "-")
  )
);
    sections.forEach((section) => {
      if (section) {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          setActiveSection(section.id);
        }
      }
    });
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  const navItems = [

  "Services",
  "Process",
  "About",
  "Testimonials",
  "Case Studies",
  "Pricing",
];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : ""
      }`}
    >
      <div className="section-container flex items-start md:items-center justify-between min-h-[90px] lg:h-20 py-3">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-start gap-2 max-w-[220px]"
        >
          <img
          src="/logo.png"
          alt="UTS Logo"
          className="w-10 h-10 object-contain"
          />

        <span className="font-display font-bold text-base md:text-lg text-white leading-snug">
         United Technologies Solutions
        </span>
        </button>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {isHome &&
            navItems.map((item) => {
              const sectionId = item.toLowerCase().replace(/\s+/g, "-");

            const isActive = activeSection === sectionId;
              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  className={`
          text-sm uppercase tracking-[2px]
          transition-all duration-200 cursor-pointer
          ${
  isActive
    ? "text-[#fbb323] drop-shadow-[0_0_18px_#fbb323] font-semibold"
    : "text-muted-foreground hover:text-[#fbb323] hover:drop-shadow-[0_0_12px_#fbb323]"
}
        `}
                >
                  {item}
                </a>
              );
            })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className={`
              relative w-10 h-10 rounded-lg flex items-center justify-center
              transition-all duration-200
              text-muted-foreground
              hover:text-[#fbb323]
              hover:drop-shadow-[0_0_8px_#fbb323]
              hover:bg-muted/50
              ${location.pathname === "/cart"
                ? "text-[#fbb323] drop-shadow-[0_0_12px_#fbb323]"
                : ""
              }
            `}
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#facc15] text-black text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* CTA */}
          <a
            href="https://calendar.app.google/FR6cLZASpaqTPHRV6"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-4 md:px-5 py-2 md:py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap"
          >
            Book a Call
          </a>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;