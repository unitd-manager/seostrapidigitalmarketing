import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { richTextToPlain } from "@/components/StrapiBlocks";
import type { RichText } from "@/types/case-study";

type CaseStudyCard = {
  id?: number;
  badge?: string;
  title?: string;
  description?: RichText;
  button_text?: string;
  button_url?: string;
};

type CaseStudiesData = {
  title?: string;
  subtitle?: string;
  automation_edge_list?: CaseStudyCard[];
};

type CaseStudiesSectionProps = {
  data: CaseStudiesData;
};

/**
 * Strapi text fields occasionally pick up a stray leading/trailing space from
 * copy-paste, and editors sometimes type the path without the leading slash.
 * Both would silently break navigation (react-router's <Link to> needs an
 * absolute path starting with "/"), so normalize before it's ever used as a route.
 */
function normalizeInternalPath(raw?: string): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const CaseStudiesSection = ({ data }: CaseStudiesSectionProps) => {
  if (!data) return null;

  const caseStudies = data?.automation_edge_list || [];

  return (
    <section id="case-studies" className="py-20 bg-background">
      <div className="section-container">
        {/* Heading */}

        <div className="text-center mb-14">
          {data?.title && (
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              {data.title}
            </h2>
          )}

          {data?.subtitle && (
            <p className="text-primary tracking-[0.2em] uppercase mt-3 text-sm font-semibold">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id ?? index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="
                relative overflow-hidden
                rounded-2xl p-8
                border border-primary/20
                bg-gradient-to-br from-[#111827] to-[#0b0f19]
                shadow-[0_0_25px_rgba(250,204,21,0.08)]
                hover:shadow-[0_0_35px_rgba(250,204,21,0.25)]
                hover:border-primary/50
                transition-all duration-500
              "
            >
              {/* Glow */}

              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500">
                <div className="absolute -inset-1 bg-primary/10 blur-3xl" />
              </div>

              <div className="relative z-10">
                {study?.badge && (
                  <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase tracking-widest font-semibold">
                    {study.badge}
                  </div>
                )}

                {study?.title && (
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {study.title}
                  </h3>
                )}

                <div className="text-muted-foreground mb-8 leading-relaxed">
                  {richTextToPlain(study.description)}
                </div>

                {study?.button_text &&
                  (() => {
                    const to = normalizeInternalPath(study.button_url);
                    if (!to) return null;
                    return (
                      <Link
                        to={to}
                        className="
                          inline-flex items-center gap-2
                          bg-primary text-black
                          px-5 py-3 rounded-xl
                          font-semibold
                          hover:scale-105
                          transition-all duration-300
                          shadow-[0_0_20px_rgba(250,204,21,0.25)]
                        "
                      >
                        {study.button_text}
                      </Link>
                    );
                  })()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;