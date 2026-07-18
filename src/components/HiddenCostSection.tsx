import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type DelayPoint = {
  point?: string;
};

type HiddenCostData = {
  eyebrow?: string;
  main_title?: string;
  description?: string;
  card_title?: string;
  highlight_title?: string;
  highlight_description?: string;
  delay_points?: DelayPoint[];
};

type HiddenCostSectionProps = {
  data: HiddenCostData;
};

const HiddenCostSection = ({ data }: HiddenCostSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const points = data?.delay_points || [];

  return (
    <section className="bg-background relative" ref={ref}>
      <div className="section-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          {data?.main_title && (
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              {data.main_title}
            </h2>
          )}

          {data?.description && (
            <p className="mt-6 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
              {Array.isArray(data.description)
                ? data.description
                    .map((block: any) =>
                      block.children?.map((child: any) => child.text).join("")
                    )
                    .join(" ")
                : data.description}
            </p>
          )}
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto rounded-2xl p-10 border-2 border-primary bg-card shadow-lg"
        >

          {data?.card_title && (
            <h3 className="text-center text-primary font-display font-bold text-xl mb-8">
              {data.card_title}
            </h3>
          )}

          <ul className="space-y-5 text-foreground text-lg font-medium">
            {points.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.1,
                }}
                className="flex items-start gap-3"
              >
                <span className="text-primary shrink-0 mt-1">•</span>
                {item.point}
              </motion.li>
            ))}
          </ul>

          {(data?.highlight_title || data?.highlight_description) && (
            <p className="mt-8 text-center text-muted-foreground font-medium">

              {data?.highlight_title && (
                <>
                  <span className="font-semibold text-foreground">
                    {data.highlight_title}
                  </span>
                  <br />
                </>
              )}

              {data?.highlight_description &&
                (Array.isArray(data.highlight_description)
                  ? data.highlight_description
                      .map((block: any) =>
                        block.children?.map((child: any) => child.text).join("")
                      )
                      .join(" ")
                  : data.highlight_description)}
            </p>
          )}

        </motion.div>

      </div>
    </section>
  );
};

export default HiddenCostSection;