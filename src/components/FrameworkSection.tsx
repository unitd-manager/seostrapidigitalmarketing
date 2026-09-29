import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Settings,
  FileText,
  Link,
  MapPin,
  BarChart3,
  Circle,
} from "lucide-react";

type FrameworkItem = {
  icon?: string;
  title?: string;
  Description?: any;
  Publish?: boolean | null;
};

type FrameworkSectionData = {
  template?: string;
  eyebrow?: string;
  title?: string;
  highlight_title?: string;
  seo_reality?: FrameworkItem[];
  Publish?: boolean | null;
};

type FrameworkSectionProps = {
  data?: FrameworkSectionData;
};

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  settings: Settings,
  "file-text": FileText,
  link: Link,
  "map-pin": MapPin,
  "bar-chart-3": BarChart3,
};

// Visible unless explicitly set to false (empty/null counts as visible)
const isPublished = (item?: { Publish?: boolean | null } | null) =>
  item?.Publish !== false;

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

const FrameworkSection = ({ data }: FrameworkSectionProps) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  // Placed after the hooks so React's rules of hooks are respected
  if (!data || !isPublished(data)) return null;

  const features = (data.seo_reality || []).filter(isPublished);

  return (
    <section id="framework" className="relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="section-container relative">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          {data.title && (
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 text-foreground">
              {data.title}
            </h2>
          )}

          {data.eyebrow && (
            <span className="text-primary text-sm font-semibold tracking-[0.25em] uppercase">
              {data.eyebrow}
            </span>
          )}
        </motion.div>

        {/* Cards */}

        {features.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, index) => {
              const Icon =
                iconMap[item.icon?.toLowerCase() || ""] || Circle;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.07,
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-2xl p-8 bg-card border border-border shadow-md transition-all duration-200 ease-out hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-primary/30 to-primary/10 flex items-center justify-center mb-5 shadow-md shadow-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {getRichText(item.Description)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default FrameworkSection;