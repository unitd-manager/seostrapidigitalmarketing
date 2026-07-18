import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Phone,
  ClipboardCheck,
  Map,
  Rocket,
  Zap,
  Circle,
} from "lucide-react";

type HighlightItem = {
  title?: string;
  step_number?: string;
  icon?: string;
};

type HowItWorksData = {
  main_title?: string;
  icon?: string;
  highlight_text?: string;
  highlights_list?: HighlightItem[];
};

type Props = {
  data?: HowItWorksData;
};

const iconMap: Record<string, React.ElementType> = {
  phone: Phone,
  "clipboard-check": ClipboardCheck,
  map: Map,
  rocket: Rocket,
  zap: Zap,
};

const HowItWorksSection = ({ data }: Props) => {
  if (!data) return null;

  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const steps = data?.highlights_list || [];

  const HeadingIcon =
    iconMap[data?.icon?.toLowerCase() || ""] || Zap;

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-gradient-to-b from-background via-secondary/20 to-background"
    >
      <div className="section-container relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <HeadingIcon className="w-12 h-12 text-primary" />

            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-primary tracking-tight">
              {data.main_title}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto font-display text-xl md:text-2xl font-bold text-foreground bg-primary/10 px-6 py-4 rounded-xl shadow-lg">
            {data.highlight_text}
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon =
              iconMap[step.icon?.toLowerCase() || ""] || Circle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="relative rounded-2xl p-8 text-center bg-card border border-border shadow-md hover:shadow-xl hover:shadow-primary/10 transition group"
              >
                <div className="text-5xl font-display font-extrabold text-primary/30 mb-4">
                  {step.step_number}
                </div>

                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-display font-bold text-lg text-foreground">
                  {step.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
