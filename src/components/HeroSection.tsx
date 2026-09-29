import { motion } from "framer-motion";

type ButtonData = {
  label?: string;
  url?: string;
  targetBlank?: boolean;
  Publish?: boolean | null;
};

type StatData = {
  value?: string;
  label?: string;
  Publish?: boolean | null;
};

type HeroData = {
  eyebrow?: string;
  title?: string;
  highlighted_title?: string;
  description?: string;
  button?: ButtonData | ButtonData[];
  secondary_button?: ButtonData | ButtonData[];
  stats?: StatData[];
  Publish?: boolean | null;
};

type HeroSectionProps = {
  data: HeroData;
};

// Visible unless explicitly set to false (empty/null counts as visible)
const isPublished = (item?: { Publish?: boolean | null } | null) =>
  item?.Publish !== false;

// Buttons can arrive as one object or an array; return the first published one
const pickButton = (btn?: ButtonData | ButtonData[]) => {
  const first = Array.isArray(btn) ? btn[0] : btn;
  return first && isPublished(first) ? first : undefined;
};

const HeroSection = ({ data }: HeroSectionProps) => {
  // Whole hero block hidden when its own Publish toggle is false
  if (!data || !isPublished(data)) return null;

  const primaryButton = pickButton(data.button);
  const secondaryButton = pickButton(data.secondary_button);

  const stats = (data.stats || []).filter(isPublished);

  return (
    <section
      id="hero"
      className="relative w-full pt-8 pb-16 overflow-hidden hero-section"
    >
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
            {data.eyebrow && (
              <span className="inline-block text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-6">
                {data.eyebrow}
              </span>
            )}

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-foreground">
              {data.title}{" "}

              {data.highlighted_title && (
                <span className="gradient-text">
                  {data.highlighted_title}
                </span>
              )}
            </h1>

            {data.description && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {data.description}
              </p>
            )}

            {/* BUTTONS */}
            {(primaryButton || secondaryButton) && (
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full">

                {primaryButton?.label && primaryButton?.url && (
                  
                    <a href={primaryButton.url}
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
                  
                 <a  href={secondaryButton.url}
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
            )}
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