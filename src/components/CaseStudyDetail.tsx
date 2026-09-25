import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StrapiBlocks, { richTextToPlain } from "@/components/StrapiBlocks";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { CaseStudy } from "@/types/case-study";
import { fetchHeader, fetchFooter } from "@/lib/strapi";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-4 mb-10">
    <h2 className="text-lg font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
      {children}
    </h2>
    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
  </div>
);

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.09] text-base text-white/70 hover:border-primary/40 hover:bg-primary/20 hover:text-white transition-all duration-300 cursor-default">
    {children}
  </span>
);

/** Renders hero_title, wrapping the hero_highlight_word substring (if present) in the gradient span. */
function HeroTitle({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) {
    return <>{title}</>;
  }
  const idx = title.indexOf(highlight);
  const before = title.slice(0, idx);
  const after = title.slice(idx + highlight.length);
  return (
    <>
      {before}
      <span className="gradient-text">{highlight}</span>
      {after}
    </>
  );
}

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

const CaseStudyDetail = ({ caseStudy }: CaseStudyDetailProps) => {
  const eyebrow = caseStudy.eyebrow ?? caseStudy.hero_label;
  const hero_title = caseStudy.hero_title;
  const hero_highlight_word = caseStudy.hero_highlight_word ?? caseStudy.hero_highlight_title;
  const hero_description = caseStudy.hero_description;
  const hero_stats = caseStudy.hero_stats ?? [];
  const overview_title = caseStudy.overview_title;
  const overview_points = caseStudy.overview_points ?? [];
  const challenge_title = caseStudy.challenge_title;
  const challenge_intro = caseStudy.challenge_intro;
  const challenge_items = caseStudy.challenge_items ?? [];
  const strategy_title = caseStudy.strategy_title;
  const strategy_intro = caseStudy.strategy_intro;
  const strategy_phases = caseStudy.strategy_phases ?? [];
  const results_title = caseStudy.results_title;
  const results_intro = caseStudy.results_intro;
  const results_stats = caseStudy.results_stats ?? caseStudy.results_items ?? [];
  const why_worked_title = caseStudy.why_worked_title ?? caseStudy.why_section_title ?? "Why the Strategy Worked";
  const why_worked_intro = caseStudy.why_worked_intro ?? caseStudy.why_section_intro;
  const why_worked_points = caseStudy.why_worked_points ?? caseStudy.why_section_items ?? [];
  const why_worked_closing = caseStudy.why_worked_closing ?? caseStudy.why_section_closing;
  const looking_ahead_title = caseStudy.looking_ahead_title ?? caseStudy.closing_title ?? "Looking Ahead";
  const looking_ahead_content = caseStudy.looking_ahead_content ?? caseStudy.closing_content;
  const conclusion_title = caseStudy.conclusion_title;
  const conclusion_content = caseStudy.conclusion_content;
  const key_results_title = caseStudy.key_results_title;
  const key_results_stats = caseStudy.key_results_stats ?? [];
  const key_results_highlight_heading = caseStudy.key_results_highlight_heading;
  const key_results_highlight_label = caseStudy.key_results_highlight_label;
  const services_provided = caseStudy.services_provided;
  const agency = caseStudy.agency;
  const campaign_focus = caseStudy.campaign_focus;
  const client = caseStudy.client;
  const industry = caseStudy.industry;

  const defaultPhaseIndex = Math.max(
    0,
    strategy_phases.findIndex((p) => p.default_active)
  );

  const [activePhase, setActivePhase] = useState(defaultPhaseIndex === -1 ? 0 : defaultPhaseIndex);
  const [openChallenge, setOpenChallenge] = useState<number | null>(null);
  const [openResult, setOpenResult] = useState<number | null>(null);

  const [headerData, setHeaderData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);

  /*
   * ---------------------------------------------------------
   * HEADER / FOOTER
   * ---------------------------------------------------------
   * This page renders standalone (not through DynamicPage),
   * so it has to fetch header/footer itself. Failures here
   * should not break the case study content.
   */
  useEffect(() => {
    const loadChrome = async () => {
      try {
        const header = await fetchHeader();
        setHeaderData(header);
      } catch (headerError) {
        console.error("CaseStudyDetail: failed to load header", headerError);
        setHeaderData(null);
      }

    try {
  const footer = await fetchFooter();
  setFooterData(footer);
} catch (footerError) {
  console.error("CaseStudyDetail: failed to load footer", footerError);
  setFooterData(null);
}
    };

    loadChrome();
  }, []);

  const activeStrategyPhase = strategy_phases[activePhase];

  return (
    <div className="min-h-screen bg-background text-white">
      <Header data={headerData} />

      {/* ── Hero Header ─────────────────────────────────────────────── */}

      <section className="relative overflow-hidden bg-[#080c14] pt-8 pb-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,119,5,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,119,5,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-start lg:-ml-10"
            >
              {eyebrow && (
                <span
                  className="inline-block text-base font-semibold tracking-[0.2em] uppercase mb-6"
                  style={{
                    background:
                      "linear-gradient(90deg, #ff7705 0%, #ffb347 40%, #ff7705 60%, #ff4500 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "organicShimmer 2.8s linear infinite",
                  }}
                >
                  {eyebrow}
                </span>
              )}
              <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold leading-[1.1] mb-8 text-white text-left">
                <HeroTitle title={hero_title} highlight={hero_highlight_word} />
              </h1>
              {hero_description && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-left">
                  {hero_description}
                </p>
              )}
            </motion.div>

            {hero_stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col gap-5 pb-8 overflow-visible"
              >
                {hero_stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="relative rounded-2xl p-6 lg:p-7 border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-primary/40 hover:bg-primary/[0.06] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,119,5,0.15)] transition-all duration-500 group cursor-default"
                  >
                    <div className="absolute inset-x-0 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="bg-[#0a0f1a]">
        <div className="section-container py-20 space-y-24">
          {/* ── Overview ─────────────────────────────────────── */}
          {overview_points.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <SectionLabel>{overview_title || "Overview"}</SectionLabel>
              <ul className="space-y-5">
                {overview_points.map((point, index) => (
                  <motion.li
                    key={point.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-lg md:text-xl text-muted-foreground leading-9">{point.text}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* ── Challenge ────────────────────────────────── */}
          {challenge_items.length > 0 && (
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <SectionLabel>{challenge_title || "Challenge"}</SectionLabel>
                {challenge_intro && (
                  <div className="mb-10">
                    <p className="text-muted-foreground text-lg md:text-xl leading-9">{challenge_intro}</p>
                  </div>
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                {challenge_items.map((item, i) => {
                  const isOpen = openChallenge === i;
                  const preview = item.short_text || richTextToPlain(item.description).slice(0, 110);
                  return (
                    <motion.div
                      key={item.id}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-60px" }}
                      variants={fadeUp}
                    >
                      <div className="gradient-card rounded-3xl p-8 border border-primary/10 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,119,5,0.25)] transition-all duration-500 h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-4xl font-bold text-primary">{item.number}</span>
                          <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                        </div>
                        <div className="text-muted-foreground pl-16">
                          {isOpen ? (
                            <div>
                              <StrapiBlocks content={item.description} className="text-lg leading-9 mb-4" />
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-5">
                                  {item.tags.map((tag) => (
                                    <Tag key={tag.id}>{tag.text}</Tag>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-base leading-8 line-clamp-2 text-muted-foreground/70">
                              {preview}
                              {preview.length >= 110 ? "…" : ""}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => setOpenChallenge(isOpen ? null : i)}
                          className="mt-4 ml-16 text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none outline-none"
                        >
                          {isOpen ? "Read Less ↑" : "Read More ↓"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── SEO / Growth Strategy ─────────────────────────────────── */}
          {strategy_phases.length > 0 && activeStrategyPhase && (
            <div>
              <SectionLabel>{strategy_title || "Strategy Implemented"}</SectionLabel>
              {strategy_intro && (
                <div className="mb-12">
                  <p className="text-muted-foreground text-lg md:text-xl leading-9">{strategy_intro}</p>
                </div>
              )}

              <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
                {/* Left active phase box */}
                <motion.div
                  key={activeStrategyPhase.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                    boxShadow: "0 0 40px rgba(255,119,5,0.3)",
                    borderColor: "rgba(255,119,5,0.6)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    boxShadow: "0 0 0px rgba(255,119,5,0)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                  transition={{ duration: 0.6 }}
                  className="rounded-3xl border bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl p-10 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(255,119,5,0.2)] hover:-translate-y-1 transition-all duration-500"
                >
                  <p className="text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-3">
                    {activeStrategyPhase.phase_label}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">{activeStrategyPhase.phase_title}</h3>
                  <StrapiBlocks content={activeStrategyPhase.intro} className="text-muted-foreground text-base md:text-lg leading-8 mb-4" />
                  {activeStrategyPhase.description && (
                    <p className="text-muted-foreground text-base md:text-lg leading-8 mb-4">
                      {activeStrategyPhase.description}
                    </p>
                  )}
                  {activeStrategyPhase.items_label && (
                    <h4 className="text-sm uppercase tracking-[0.2em] text-white/70 mt-6 mb-4">
                      {activeStrategyPhase.items_label}
                    </h4>
                  )}
                  {activeStrategyPhase.items?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeStrategyPhase.items.map((tag) => (
                        <Tag key={tag.id}>{tag.text}</Tag>
                      ))}
                    </div>
                  )}
                  {activeStrategyPhase.closing_text && (
                    <p className="text-muted-foreground text-base md:text-lg leading-8">
                      {activeStrategyPhase.closing_text}
                    </p>
                  )}
                </motion.div>

                {/* Right phase selector */}
                <div className="flex flex-col gap-4">
                  {strategy_phases.map((phase, index) => (
                    <div
                      key={phase.id}
                      onMouseEnter={() => setActivePhase(index)}
                      className={`cursor-pointer rounded-2xl p-6 border transition-all duration-500 group ${
                        activePhase === index
                          ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(255,119,5,0.25),0_20px_50px_rgba(255,119,5,0.15)] scale-[1.02]"
                          : "border-white/[0.07] bg-white/[0.03] hover:border-primary/40 hover:bg-primary/[0.06] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,119,5,0.2)] hover:-translate-y-1"
                      }`}
                    >
                      <p className="text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-2">{phase.phase_label}</p>
                      <h3 className="text-lg font-bold group-hover:text-white transition-colors duration-300">{phase.phase_title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Results ───────────────────────────────────── */}
          {results_stats.length > 0 && (
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <SectionLabel>{results_title || "Results"}</SectionLabel>
                {results_intro && (
                  <div className="mb-10">
                    <p className="text-muted-foreground text-lg md:text-xl leading-9">{results_intro}</p>
                  </div>
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {results_stats.map((result, index) => {
                  const isOpen = openResult === index;
                  return (
                    <motion.div
                      key={result.id}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                      className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl p-8 md:p-10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,119,5,0.12)] transition-all duration-500 group"
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="text-4xl md:text-5xl font-bold text-primary mb-3">{result.heading}</div>
                      {result.sub_heading && (
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                          {result.sub_heading}
                        </h3>
                      )}
                      <p className="text-muted-foreground text-base leading-8 mb-5">{result.description}</p>
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isOpen ? "max-h-[1200px] opacity-100 mb-6" : "max-h-0 opacity-0"
                        }`}
                      >
                        <StrapiBlocks content={result.expanded_content} className="text-muted-foreground text-lg leading-9 mb-5" />
                        {(result.badge_label || result.badge_text) && (
                          <div className="rounded-2xl border border-primary/20 bg-primary/[0.08] p-5 mb-6">
                            {result.badge_label && (
                              <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                                {result.badge_label}
                              </p>
                            )}
                            {result.badge_text && <h4 className="text-xl font-bold text-white">{result.badge_text}</h4>}
                          </div>
                        )}
                        {result.closing_text && (
                          <p className="text-muted-foreground text-lg leading-9">{result.closing_text}</p>
                        )}
                      </div>
                      <button
                        onClick={() => setOpenResult(isOpen ? null : index)}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:text-orange-300 transition-colors duration-300 bg-transparent border-none outline-none"
                      >
                        {isOpen ? "View Less ↑" : "View More ↓"}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Why It Worked ────────────────────────────────── */}
          {why_worked_points.length > 0 && (
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                <SectionLabel>{why_worked_title || "Why the Strategy Worked"}</SectionLabel>
                {why_worked_intro && (
                  <div className="mb-10">
                    <p className="text-muted-foreground text-lg md:text-xl leading-9">{why_worked_intro}</p>
                  </div>
                )}
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {why_worked_points.map((item, i) => (
                  <motion.div
                    key={item.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    className="glass-card flex items-start gap-4 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 hover:bg-primary/[0.04] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,119,5,0.2)] transition-all duration-500"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-xs">✓</span>
                    </div>
                    <span className="text-base font-medium text-white/80 leading-7">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {why_worked_closing && (
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="text-muted-foreground text-xl md:text-2xl leading-9 mt-12 max-w-2xl"
                >
                  {why_worked_closing}
                </motion.p>
              )}
            </div>
          )}

          {/* ── Looking Ahead ───────────────────────────────────── */}
          {looking_ahead_content && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <SectionLabel>{looking_ahead_title || "Looking Ahead"}</SectionLabel>
              <div className="glass-card relative rounded-3xl border border-primary/10 p-8 md:p-10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,119,5,0.1)] transition-all duration-500 group">
                <div className="absolute inset-x-0 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="space-y-4">
                  <StrapiBlocks content={looking_ahead_content} className="text-muted-foreground text-base md:text-lg leading-9" />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Conclusion ───────────────────────────────────── */}
          {conclusion_content && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <SectionLabel>{conclusion_title || "Conclusion"}</SectionLabel>
              <div className="glass-card relative rounded-3xl border border-primary/10 p-8 md:p-10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,119,5,0.1)] transition-all duration-500 group">
                <div className="absolute inset-x-0 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="space-y-4">
                  <StrapiBlocks content={conclusion_content} className="text-muted-foreground text-base md:text-lg leading-9" />
                </div>
              </div>
            </motion.div>
          )}
          {/* ── Key Results Summary ───────────────────────────────── */}
{(key_results_stats.length > 0 || key_results_highlight_heading) && (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
    <SectionLabel>{key_results_title || "Key Results Summary"}</SectionLabel>
    <div className="grid md:grid-cols-3 gap-4 mb-4">
      {key_results_stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 text-center hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
        >
          <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-base text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
    {key_results_highlight_heading && (
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8 text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">{key_results_highlight_heading}</div>
        <div className="text-base text-muted-foreground">{key_results_highlight_label}</div>
      </div>
    )}
  </motion.div>
)}

{/* ── Project Information ───────────────────────────────── */}
{(client || industry || services_provided || agency || campaign_focus) && (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
    <SectionLabel>Project Information</SectionLabel>
    <div className="glass-card rounded-3xl border border-primary/10 p-8 md:p-10 grid sm:grid-cols-2 gap-8">
      {client && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Client</p>
          <p className="text-lg font-bold text-white">{client}</p>
        </div>
      )}
      {industry && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Industry</p>
          <p className="text-lg font-bold text-white">{industry}</p>
        </div>
      )}
      {services_provided && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Services Provided</p>
          <p className="text-base text-muted-foreground">{services_provided}</p>
        </div>
      )}
      {agency && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Agency</p>
          <p className="text-lg font-bold text-white">{agency}</p>
        </div>
      )}
      {campaign_focus && (
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Campaign Focus</p>
          <p className="text-base text-muted-foreground">{campaign_focus}</p>
        </div>
      )}
    </div>
  </motion.div>
)}
        </div>
      </div>

      <style>{`
        @keyframes organicShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <Footer data={footerData} />
    </div>
  );
};

export default CaseStudyDetail;