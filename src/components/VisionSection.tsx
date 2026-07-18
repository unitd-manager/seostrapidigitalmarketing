import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type VisionItem = {
  title?: string;
  Description?: any;
};

type VisionSectionData = {
  eyebrow?: string;
  title?: string;
  description?: any;
  bottom_text?: string;
  seo_reality?: VisionItem[];
};

type VisionSectionProps = {
  data: VisionSectionData;
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

const VisionSection = ({ data }: VisionSectionProps) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const items = data?.seo_reality || [];

  return (
    <section
      className="relative bg-gradient-to-br from-background via-secondary to-background"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-primary/5 to-primary/5 animate-pulse" />

      <div className="section-container relative">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {data?.eyebrow && (
            <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
              {data.eyebrow}
            </span>
          )}

          {data?.title && (
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6 gradient-text">
              {data.title}
            </h2>
          )}

          {data?.description && (
            <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              {getRichText(data.description)}
            </p>
          )}
        </motion.div>

        {/* Vision Items */}

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.2,
                }}
                className="flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary via-accent to-primary shadow-lg shadow-primary/30 flex items-center justify-center font-display text-lg font-bold text-primary-foreground animate-pulse">
                  {item.title}
                </div>

                <p className="mt-4 text-sm text-muted-foreground text-center max-w-[160px]">
                  {getRichText(item.Description)}
                </p>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Bottom Text */}

        {data?.bottom_text && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 1,
            }}
            className="max-w-3xl mx-auto text-center mt-12"
          >
            <p className="text-lg text-secondary-foreground leading-relaxed font-medium">
              {data.bottom_text}
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default VisionSection;