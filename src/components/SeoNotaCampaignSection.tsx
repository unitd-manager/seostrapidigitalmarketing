import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  Clock,
  Zap,
  Target,
  Circle,
} from "lucide-react";

type SeoRealityItem = {
  icon?: string;
  title?: string;
  Description?: any;
};

type SeoRealitySectionData = {
  template?: string;
  eyebrow?: string;
  title?: string;
 highlight_title?: string;
  seo_reality?: SeoRealityItem[];
};

type Props = {
  data?: SeoRealitySectionData;
};

const iconMap: Record<string, React.ElementType> = {
  clock: Clock,
  "trending-up": TrendingUp,
  zap: Zap,
  target: Target,
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

const SeoNotaCampaignSection = ({ data }: Props) => {
  if (!data) return null;

  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const insights = data?.seo_reality || [];

  return (
    <section
      className="bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden"
      ref={ref}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>

      <div className="section-container relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          {data.eyebrow && (
            <h3 className="text-primary font-semibold text-lg mb-3">
              {data.eyebrow}
            </h3>
          )}

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight">
            {data.title}
            <br />
            <span className="text-primary">
              {data.highlight_title}
            </span>
          </h2>
        </motion.div>

        {/* Circle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">

          {insights.map((item, index) => {

            const Icon =
              iconMap[item.icon?.toLowerCase() || ""] || Circle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                  scale: 1.03,
                }}
                className="relative overflow-hidden rounded-full p-4 md:p-6 border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm group aspect-square flex flex-col items-center justify-center text-center"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute -inset-1 bg-primary/10 blur opacity-20 rounded-full"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full">

                  <div className="mb-2 md:mb-3 p-2 bg-secondary rounded-full">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>

                  <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 leading-tight px-2">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm leading-tight px-2 text-muted-foreground">
                    {getRichText(item.Description)}
                  </p>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default SeoNotaCampaignSection;
