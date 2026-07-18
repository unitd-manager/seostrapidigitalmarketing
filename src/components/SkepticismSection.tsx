import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  ShieldX,
  Zap,
  CircleAlert,
} from "lucide-react";

type ConcernCard = {
  icon?: string;
  title?: string;
};

type SkepticismData = {
  eyebrow?: string;
  main_title?: string;
  description?: string;
  highlight_text?: string;
  highlight_title?: string;
  highlight_subtext?: string;
  concern_cards?: ConcernCard[];
};

type SkepticismSectionProps = {
  data: SkepticismData;
};

const iconMap: Record<string, React.ElementType> = {
  clock: Clock,
  "shield-x": ShieldX,
  "alert-circle": AlertCircle,
  zap: Zap,
};

const SkepticismSection = ({ data }: SkepticismSectionProps) => {
  const objections = data?.concern_cards || [];

  return (
    <section className="bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full"></div>

      <div className="section-container relative z-10 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {data?.eyebrow && (
            <h3 className="text-primary font-semibold text-lg mb-3">
              {data.eyebrow}
            </h3>
          )}

          {data?.main_title && (
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              {data.main_title}
            </h2>
          )}

          {data?.description && (
            <p className="text-muted-foreground mb-6">
              {data.description}
            </p>
          )}

          {/* Statement Boxes */}
          <div className="space-y-4">

            {data?.highlight_text && (
              <div className="relative inline-block px-6 py-4 rounded-xl border border-primary/30 bg-primary/10 backdrop-blur">
                <p className="text-foreground font-medium">
                  {data.highlight_text}
                </p>

                <div className="absolute inset-0 blur-xl bg-primary/10 -z-10 rounded-xl"></div>
              </div>
            )}

            {(data?.highlight_title || data?.highlight_subtext) && (
              <div className="relative inline-block px-6 py-4 rounded-xl border border-primary/30 bg-primary/10 backdrop-blur">

                {data?.highlight_title && (
                  <p className="text-foreground font-semibold text-center">
                    {data.highlight_title}
                  </p>
                )}

                {data?.highlight_subtext && (
                  <p className="text-primary font-semibold text-center mt-1">
                    {data.highlight_subtext}
                  </p>
                )}

                <div className="absolute inset-0 blur-xl bg-primary/10 -z-10 rounded-xl"></div>
              </div>
            )}

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="grid gap-4">

          {objections.map((item, i) => {
            const Icon =
              iconMap[item.icon?.toLowerCase() || ""] || CircleAlert;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="group flex items-center justify-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition"
              >
                <div className="p-2.5 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <p className="text-secondary-foreground text-sm text-left w-full">
                  {item.title}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default SkepticismSection;