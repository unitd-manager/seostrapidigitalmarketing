import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

type MenuItem = {
  url?: string;
  targetBlank?: boolean;
  label?: string;
};

type HeaderData = {
  logo?: any;
  company_name?: string;
  menu_item?: MenuItem[];
  cart_enabled?: boolean;
  cart_url?: string;
  cta_label?: string;
  cta_url?: string;
  cta_target_blank?: boolean;
};

type HeaderProps = {
  data?: HeaderData | null;
};

const Header = ({ data }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { cartCount } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  /*
   * ---------------------------------------------------------
   * SCROLL EFFECT
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * ACTIVE HOME SECTION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!data?.menu_item) return;

    const handleScroll = () => {
      const menuItems = data.menu_item || [];

      let currentSection = "";

      menuItems.forEach((item) => {
        if (!item.url) return;

        /*
         * Only process URLs such as:
         *
         * /#timeline
         * /#pricing
         */

        if (!item.url.includes("#")) return;

        const hash = item.url.split("#")[1];

        if (!hash) return;

        const section = document.getElementById(hash);

        if (!section) return;

        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          currentSection = hash;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  /*
   * ---------------------------------------------------------
   * MENU CLICK
   * ---------------------------------------------------------
   */

  const handleMenuClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    item: MenuItem
  ) => {
    if (!item.url) return;

    /*
     * External links
     */

    if (
      item.url.startsWith("http://") ||
      item.url.startsWith("https://")
    ) {
      return;
    }

    /*
     * Home section links
     *
     * Example:
     * /#timeline
     * /#pricing
     */

    if (item.url.startsWith("/#")) {
      event.preventDefault();

      const hash = item.url.substring(2);

      /*
       * Already on Home
       */

      if (isHome) {
        const section = document.getElementById(hash);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          window.history.replaceState(
            null,
            "",
            `/#${hash}`
          );
        }

        return;
      }

      /*
       * Currently on another page.
       *
       * Go to Home and the requested section.
       */

      navigate(`/#${hash}`);

      return;
    }

    /*
     * Normal internal page
     */

    if (item.url.startsWith("/")) {
      event.preventDefault();

      navigate(item.url);
    }
  };

  /*
   * ---------------------------------------------------------
   * LOGO URL
   * ---------------------------------------------------------
   */

  const getLogoUrl = () => {
    if (!data?.logo) {
      return "/logo.png";
    }

    /*
     * Strapi v5 style
     */

    if (data.logo.url) {
      return data.logo.url.startsWith("http")
        ? data.logo.url
        : `${import.meta.env.VITE_STRAPI_URL}${data.logo.url}`;
    }

    /*
     * Strapi v4 style
     */

    if (data.logo.data?.attributes?.url) {
      const url = data.logo.data.attributes.url;

      return url.startsWith("http")
        ? url
        : `${import.meta.env.VITE_STRAPI_URL}${url}`;
    }

    return "/logo.png";
  };

  /*
   * ---------------------------------------------------------
   * IF STRAPI HEADER DATA IS NOT AVAILABLE
   * ---------------------------------------------------------
   */

  if (!data) {
    return null;
  }

  /*
   * ---------------------------------------------------------
   * HEADER
   * ---------------------------------------------------------
   */

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

        {/* =================================================
            LOGO
        ================================================= */}

        <button
          onClick={() => navigate("/")}
          className="flex items-start gap-2 max-w-[220px]"
        >
          <img
            src={getLogoUrl()}
            alt={data.company_name || "UTS Logo"}
            className="w-10 h-10 object-contain"
          />

          {data.company_name && (
            <span className="font-display font-bold text-base md:text-lg text-white leading-snug">
              {data.company_name}
            </span>
          )}
        </button>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="hidden md:flex items-center gap-8">
          {(data.menu_item || []).map((item, index) => {
            if (!item.label || !item.url) {
              return null;
            }

            /*
             * Get section ID from URLs such as:
             *
             * /#timeline
             * /#pricing
             */

            let sectionId = "";

            if (item.url.includes("#")) {
              sectionId = item.url.split("#")[1];
            }

            const isActive =
              sectionId &&
              activeSection === sectionId;

            return (
              <a
                key={`${item.label}-${index}`}
                href={item.url}
                target={
                  item.targetBlank
                    ? "_blank"
                    : undefined
                }
                rel={
                  item.targetBlank
                    ? "noopener noreferrer"
                    : undefined
                }
                onClick={(event) =>
                  handleMenuClick(event, item)
                }
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
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="flex items-center gap-3">

          {/* CART */}

          {data.cart_enabled && (
            <button
              onClick={() =>
                navigate(data.cart_url || "/cart")
              }
              className={`
                relative w-10 h-10 rounded-lg flex items-center justify-center
                transition-all duration-200
                text-muted-foreground
                hover:text-[#fbb323]
                hover:drop-shadow-[0_0_8px_#fbb323]
                hover:bg-muted/50
                ${
                  location.pathname ===
                  (data.cart_url || "/cart")
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
          )}

          {/* BOOK A CALL */}

          {data.cta_label && data.cta_url && (
            <a
              href={data.cta_url}
              target={
                data.cta_target_blank
                  ? "_blank"
                  : undefined
              }
              rel={
                data.cta_target_blank
                  ? "noopener noreferrer"
                  : undefined
              }
              className="bg-primary text-primary-foreground px-4 md:px-5 py-2 md:py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap"
            >
              {data.cta_label}
            </a>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;