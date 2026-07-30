import { motion } from "framer-motion";

type ButtonData = {
  label?: string;
  url?: string;
  targetBlank?: boolean;
};

type StatData = {
  value?: string;
  label?: string;
};

type HeroData = {
  eyebrow?: string;
  title?: string;
  highlighted_title?: string;
  description?: string;
  button?: ButtonData | ButtonData[];
  secondary_button?: ButtonData | ButtonData[];
  stats?: StatData[];
};

type HeroSectionProps = {
  data: HeroData;
};

const HeroSection = ({ data }: HeroSectionProps) => {
  if (!data) return null;

  const primaryButton = Array.isArray(data?.button)
    ? data.button[0]
    : data?.button;

  const secondaryButton = Array.isArray(data?.secondary_button)
    ? data.secondary_button[0]
    : data?.secondary_button;

  const stats = data?.stats || [];

  return (
    <section className="relative w-full pt-8 pb-16 overflow-hidden hero-section">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {data?.eyebrow && (
              <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-6">
                {data.eyebrow}
              </span>
            )}

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-foreground">
              {data?.title}{" "}

              {data?.highlighted_title && (
                <span className="gradient-text">
                  {data.highlighted_title}
                </span>
              )}
            </h1>
 
            {data?.description && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {data.description}
              </p>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full">

              {primaryButton?.label && primaryButton?.url && (
                <a
                  href={primaryButton.url}
                  target={primaryButton.targetBlank ? "_blank" : "_self"}
                  rel={
                    primaryButton.targetBlank
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-block bg-primary text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
                >
                  {primaryButton.label}
                </a>
              )}

              {secondaryButton?.label && secondaryButton?.url && (
                <a
                  href={secondaryButton.url}
                  target={secondaryButton.targetBlank ? "_blank" : "_self"}
                  rel={
                    secondaryButton.targetBlank
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl text-base font-medium hover:bg-secondary transition-colors whitespace-nowrap w-full sm:w-auto"
                >
                  {secondaryButton.label}
                </a>
              )}

            </div>
          </motion.div>

          {/* RIGHT STATS CARD */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="gradient-card rounded-2xl p-8 lg:p-10"
            >
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={`${stat.label}-${index}`}>
                    <div className="text-3xl font-bold text-primary">
                      {stat.value}
                    </div>

                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;