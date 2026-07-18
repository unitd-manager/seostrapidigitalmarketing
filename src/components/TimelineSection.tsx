import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wrench,
  BookOpen,
  TrendingUp,
  Circle,
} from "lucide-react";

type GridItem = {
  icon?: string;
  month?: string;
  point1?: string;
  point2?: string;
  point3?: string;
};

type TimelineSectionData = {
  eyebrow?: string;
  main_title?: string;
  description?: string;
  grid_items?: GridItem[];
};

type TimelineSectionProps = {
  data: TimelineSectionData;
};

const iconMap: Record<string, React.ElementType> = {
  wrench: Wrench,
  "book-open": BookOpen,
  "trending-up": TrendingUp,
};

const TimelineSection = ({ data }: TimelineSectionProps) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const timeline = data?.grid_items || [];

  return (
    <section id="timeline" className="relative" ref={ref}>
      <div className="absolute inset-0 bg-secondary/30" />

      <div className="section-container relative">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {data?.eyebrow && (
            <h3 className="text-primary font-semibold text-lg mb-3">
              {data.eyebrow}
            </h3>
          )}

          {data?.main_title && (
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-primary tracking-tight">
              {data.main_title}
            </h2>
          )}

          {data?.description && (
            <p className="mt-6 max-w-3xl mx-auto font-display text-xl md:text-2xl font-bold text-foreground bg-primary/10 px-6 py-4 rounded-lg shadow-md">
              {data.description}
            </p>
          )}
        </motion.div>

        {/* Timeline */}

        <div className="relative max-w-6xl mx-auto">

          <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-border" />

          <div className="grid md:grid-cols-3 gap-8">

            {timeline.map((item, index) => {

              const Icon =
                iconMap[item.icon?.toLowerCase() || ""] || Circle;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                  }}
                  className="relative text-center"
                >
                  {/* Icon */}

                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6 relative z-10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Card */}

                  <div className="gradient-card rounded-2xl p-8">

                    {item.month && (
                      <h3 className="font-display font-bold text-lg text-primary mb-6">
                        {item.month}
                      </h3>
                    )}

                    <ul className="space-y-4 text-left">

                      {item.point1 && (
                        <li className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-primary text-xs mt-1">
                            ▸
                          </span>
                          <span>{item.point1}</span>
                        </li>
                      )}

                      {item.point2 && (
                        <li className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-primary text-xs mt-1">
                            ▸
                          </span>
                          <span>{item.point2}</span>
                        </li>
                      )}

                      {item.point3 && (
                        <li className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-primary text-xs mt-1">
                            ▸
                          </span>
                          <span>{item.point3}</span>
                        </li>
                      )}

                    </ul>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
};

export default TimelineSection;