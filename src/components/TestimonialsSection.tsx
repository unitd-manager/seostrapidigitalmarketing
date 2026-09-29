import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, User, UserRound } from "lucide-react";

type StatItem = {
  value?: string;
  label?: string;
  Publish?: boolean | null;
};

type TestimonialItem = {
  quote?: any;
  client_name?: string;
  designation?: string;
  company?: string;
  avatar?: string;
  rating?: number;
  Publish?: boolean | null;
};

type TestimonialsSectionData = {
  eyebrow?: string;
  main_title?: string;
  description?: any;
  stats?: StatItem[];
  Testimonial_Items?: TestimonialItem[];
  Publish?: boolean | null;
};

type TestimonialsSectionProps = {
  data?: TestimonialsSectionData;
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

const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  // Placed after the hooks so React's rules of hooks are respected
  if (!data || !isPublished(data)) return null;

  const stats = (data.stats || []).filter(isPublished);
  const testimonials = (data.Testimonial_Items || []).filter(isPublished);

  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-br from-background via-secondary to-background"
      ref={ref}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 animate-pulse" />

      <div className="section-container relative">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {data.main_title && (
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 text-foreground">
              {data.main_title}
            </h2>
          )}

          {data.eyebrow && (
            <h3 className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mt-2">
              {data.eyebrow}
            </h3>
          )}

          {data.description && (
            <p className="mt-6 max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
              {getRichText(data.description)}
            </p>
          )}
        </motion.div>

        {/* Stats */}

        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="rounded-xl p-6 text-center gradient-card hover:shadow-lg hover:shadow-primary/20 transition-all duration-500"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                  {item.value}
                </div>

                <div className="text-sm text-muted-foreground mt-2">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Testimonials */}

        {testimonials.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="rounded-xl p-8 flex flex-col gradient-card hover:shadow-lg hover:shadow-primary/20 transition-all duration-500"
              >
                {/* Rating */}

                <div className="flex gap-1 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote */}

                <p className="text-secondary-foreground leading-relaxed mb-6 flex-1">
                  "{getRichText(item.quote)}"
                </p>

                {/* Author */}

                <div className="flex items-start gap-3 mt-4">
                  {item.avatar === "female" ? (
                    <UserRound className="w-14 h-14 text-pink-400" />
                  ) : (
                    <User className="w-14 h-14 text-primary" />
                  )}

                  <div>
                    <div className="font-display font-bold text-foreground">
                      {item.client_name}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {item.designation}
                    </div>

                    <div className="text-xs text-primary mt-1">
                      {item.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;