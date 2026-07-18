import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  AlertTriangle,
  TrendingDown,
  Users,
  Search,
  DollarSign,
  CircleAlert,
} from "lucide-react";

type PainPoint = {
  icon?: string;
  text?: string;
};

type ProblemSectionData = {
  eyebrow?: string;
  main_title?: string;
  description?: string;
  highlight_text?: string;
  list?: PainPoint[];
};

type Props = {
  data: ProblemSectionData;
};

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  "trending-down": TrendingDown,
  users: Users,
  "alert-triangle": AlertTriangle,
  "dollar-sign": DollarSign,
};

export default function ProblemSection({ data }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const painPoints = data?.list || [];

  return (
    <section className="bg-background relative overflow-hidden" ref={ref}>

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full"></div>

      <div className="section-container relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          {data?.eyebrow && (
            <h3 className="text-primary font-semibold text-lg mb-2">
              {data.eyebrow}
            </h3>
          )}

          {data?.main_title && (
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
              {data.main_title}
            </h2>
          )}

          {data?.description && (
            <p className="mt-4 text-muted-foreground text-sm">
              {typeof data.description === "string"
                ? data.description
                : JSON.stringify(data.description)}
            </p>
          )}
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {painPoints.map((item, i) => {
            const Icon =
              iconMap[item.icon?.toLowerCase() || ""] || CircleAlert;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04, y: -5 }}
                className="group relative rounded-xl p-[1px] bg-gradient-to-br from-primary/30 via-primary/10 to-transparent"
              >
                <div className="rounded-xl bg-card p-5 flex items-start gap-3 h-full transition-all duration-300 group-hover:bg-secondary">

                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className="p-2.5 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 group-hover:from-primary/40 group-hover:to-primary/20 transition"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </motion.div>

                  <p className="text-secondary-foreground text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-primary/20"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight */}
        {data?.highlight_text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="relative inline-block px-8 py-5 rounded-2xl border border-primary/20 glass-card">

              <p className="text-xl md:text-2xl font-bold text-foreground italic">
                {data.highlight_text}
              </p>

              <div className="absolute inset-0 rounded-2xl blur-2xl bg-primary/10 -z-10"></div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}