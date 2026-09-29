import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { fetchFooter } from "@/lib/strapi";

const FooterSection = () => {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const footer = await fetchFooter();
        setFooterData(footer);
      } catch (footerError) {
        console.error("FooterSection: failed to load footer", footerError);
        setFooterData(null);
      }
    };

    loadFooter();
  }, []);

  if (!footerData) return null;

  return <Footer data={footerData} />;
};

export default FooterSection;