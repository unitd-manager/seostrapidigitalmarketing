import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

type CTAButton = {
  label?: string;
  url?: string;
  targetBlank?: boolean;
};

type FinalCTASectionData = {
  main_title?: string;
  description?: any;
  bottom_text?: string;
  cta_button?: CTAButton;
};

type Props = {
  data?: FinalCTASectionData;
};

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

const FinalCTASection = ({ data }: Props) => {
  if (!data) return null;

  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section id="cta" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {data.main_title && (
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {data.main_title}
            </h2>
          )}

          {data.description && (
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              {getRichText(data.description)}
            </p>
          )}

          {data.cta_button && (
            <motion.a
              href={data.cta_button.url || "#"}
              target={data.cta_button.targetBlank ? "_blank" : "_self"}
              rel={
                data.cta_button.targetBlank
                  ? "noopener noreferrer"
                  : undefined
              }
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="glow-button animate-glow-pulse inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-xl text-lg font-bold"
            >
              {data.cta_button.label}
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          )}

          {data.bottom_text && (
            <p className="text-sm text-muted-foreground mt-6">
              {data.bottom_text}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
