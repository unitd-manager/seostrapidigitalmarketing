'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";

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

const seoPhases = [
  {
    phase: "Phase 1",
    title: "Technical SEO Optimization",
    intro: [
      "A strong SEO foundation begins with technical excellence.",
      "The first stage focused on identifying and resolving issues that could prevent search engines from effectively crawling, understanding, and ranking the website.",
    ],
    label: "Key Improvements Included",
    tags: ["Website architecture optimization","Indexing improvements","Metadata restructuring","Internal linking enhancements","XML sitemap optimization","Core Web Vitals improvements","Mobile usability enhancements","Page speed optimization"],
    outro: "These improvements created a stronger framework for future SEO growth.",
  },
  {
    phase: "Phase 2",
    title: "Content Optimization Strategy",
    intro: [
      "Content plays a critical role in helping businesses connect with users actively searching for solutions online.",
      "The United Technologies Solutions team conducted extensive keyword research.",
    ],
    label: "Content Enhancements Included",
    tags: ["Service page optimization","SEO-focused content creation","Keyword mapping","Content structure improvements","Internal linking strategy","Search intent optimization"],
    outro: "This approach helped improve relevance for both search engines and users.",
  },
  {
    phase: "Phase 3",
    title: "Authority Building and Brand Visibility",
    intro: [
      "Search engines evaluate not only website content but also overall authority and trustworthiness.",
      "A strategic authority-building campaign was implemented.",
    ],
    label: "Key Activities Included",
    tags: ["High-quality backlink acquisition","Industry citation development","Digital PR opportunities","Brand visibility improvements","Competitive link analysis"],
    outro: "These efforts helped increase domain authority and strengthen the website's overall SEO profile.",
  },
  {
    phase: "Phase 4",
    title: "User Experience Optimization",
    intro: [
      "SEO success is no longer driven solely by rankings.",
      "Search engines increasingly prioritize websites that deliver strong user experiences.",
    ],
    label: "Focus Areas Included",
    tags: ["Improved navigation structure","Clear service pathways","Enhanced page readability","Better mobile experience","Improved call-to-action placement"],
    outro: "These improvements helped visitors find information more easily while encouraging meaningful engagement.",
  },
];

interface ChallengeItem { num: string; title: string; body: ReactNode }
const challenges: ChallengeItem[] = [
  {
    num: "01", title: "Limited Search Visibility",
    body: (
      <>
        <p className="text-lg leading-9">The website struggled to rank for highly competitive industry keywords related to automation, AI solutions, and business process transformation.</p>
        <p className="mt-4 text-lg leading-9">As a result, many potential customers searching for these services were discovering competitors instead of qBotica.</p>
      </>
    ),
  },
  {
    num: "02", title: "Inconsistent Lead Generation",
    body: (
      <>
        <p className="text-lg leading-9">While other marketing channels provided occasional traffic, the company lacked a predictable and scalable source of qualified inbound leads from organic search.</p>
        <p className="mt-4 text-lg leading-9">This created challenges in maintaining a steady flow of new business opportunities.</p>
      </>
    ),
  },
  {
    num: "03", title: "Technical SEO Limitations",
    body: (
      <>
        <p className="mb-5 text-lg leading-9">A detailed website audit revealed several technical issues affecting overall search performance, including:</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {["Crawlability concerns","Indexing inefficiencies","Metadata inconsistencies","Site performance limitations","Underutilized SEO architecture"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p className="text-lg leading-9">These issues reduced the website's ability to achieve stronger search engine visibility.</p>
      </>
    ),
  },
  {
    num: "04", title: "Content Gaps",
    body: (
      <>
        <p className="text-lg leading-9">Many service pages lacked comprehensive keyword targeting and did not fully address the search intent of prospective customers.</p>
        <p className="mt-4 text-lg leading-9">Important industry topics that potential buyers frequently searched for were either missing or insufficiently optimized.</p>
      </>
    ),
  },
];

interface ResultItem { metric: string; title: string; description: string; content: ReactNode }
const results: ResultItem[] = [
  {
    metric: "187%",
    title: "Growth in Organic Traffic",
    description: "One of the most significant achievements was the substantial increase in organic website traffic, expanding the company's digital reach to potential customers actively searching for automation and technology solutions.",
    content: (
      <>
        <p className="text-muted-foreground text-lg leading-9 mb-5">By improving rankings across targeted keywords and expanding search visibility, qBotica experienced a substantial rise in visitors arriving through search engines.</p>
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.08] p-5 mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Result</p>
          <h4 className="text-xl font-bold text-white">187% Increase in Organic Traffic</h4>
        </div>
        <p className="text-muted-foreground text-lg leading-9">This growth expanded the company's digital reach and increased exposure to potential customers actively searching for automation and technology solutions.</p>
      </>
    ),
  },
  {
    metric: "3X",
    title: "Increase in Qualified Leads",
    description: "As search visibility improved and content became more aligned with user intent, qBotica saw a significant increase in inbound inquiries from relevant prospects, creating a more predictable lead-generation pipeline.",
    content: (
      <>
        <p className="text-muted-foreground text-lg leading-9 mb-5">The ultimate goal was generating qualified business opportunities.</p>
        <p className="text-muted-foreground text-lg leading-9 mb-6">As search visibility improved and content became more aligned with user intent, qBotica saw a significant increase in inbound inquiries from relevant prospects.</p>
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.08] p-5 mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Result</p>
          <h4 className="text-xl font-bold text-white">3X Growth in Qualified Leads</h4>
        </div>
        <p className="text-muted-foreground text-lg leading-9">This helped create a more predictable and scalable lead-generation pipeline.</p>
      </>
    ),
  },
  {
    metric: "Top",
    title: "Improved Search Rankings",
    description: "Several targeted search terms achieved first-page visibility, while multiple strategic keywords moved into highly competitive ranking positions, strengthening qBotica's market presence.",
    content: (
      <>
        <p className="text-muted-foreground text-lg leading-9 mb-5">The campaign successfully increased visibility for core industry keywords.</p>
        <p className="text-muted-foreground text-lg leading-9 mb-6">Several targeted search terms achieved first-page visibility, while multiple strategic keywords moved into highly competitive ranking positions.</p>
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.08] p-5 mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Result</p>
          <h4 className="text-xl font-bold text-white">Top Rankings for Core Industry Keywords</h4>
        </div>
        <p className="text-muted-foreground text-lg leading-9">This strengthened qBotica's position within its market and increased visibility among decision-makers searching for relevant solutions.</p>
      </>
    ),
  },
  {
    metric: "92%",
    title: "Increase in SEO ROI",
    description: "By focusing on sustainable organic growth rather than short-term paid traffic, the campaign delivered strong returns on investment with ongoing visibility and long-term lead generation.",
    content: (
      <>
        <p className="text-muted-foreground text-lg leading-9 mb-6">By focusing on sustainable organic growth rather than short-term paid traffic, the campaign delivered strong returns on investment.</p>
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.08] p-5 mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Result</p>
          <h4 className="text-xl font-bold text-white">92% Improvement in SEO ROI</h4>
        </div>
        <p className="text-muted-foreground text-lg leading-9">The company benefited from ongoing visibility, recurring traffic, and long-term lead generation without relying solely on paid advertising channels.</p>
      </>
    ),
  },
];

const overviewPoints = [
  "qBotica is a technology-driven company focused on delivering intelligent automation, AI-powered solutions, and digital transformation services for businesses seeking greater operational efficiency and innovation.",
  "While qBotica had established a strong reputation within its industry, the company faced a common challenge experienced by many technology service providers. Despite offering high-value solutions, its online visibility did not accurately reflect its expertise, capabilities, or market position.",
  "To strengthen its digital presence and attract more qualified prospects, qBotica partnered with United Technologies Solutions to implement a long-term SEO strategy focused on sustainable growth, search visibility, and lead generation.",
  "The objective was simple: make it easier for potential customers actively searching for automation and technology solutions to discover qBotica through organic search.",
];

const TransportationCaseStudy = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [openChallenge, setOpenChallenge] = useState<number | null>(null);
  const [openResult, setOpenResult] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />

      {/* ── Hero Header ─────────────────────────────────────────────── */}
      
      <section className="relative overflow-hidden bg-[#080c14] pt-8 pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,119,5,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,119,5,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-14 items-center">

            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-start lg:-ml-10">
              <span className="inline-block text-base font-semibold tracking-[0.2em] uppercase mb-6" style={{ background: "linear-gradient(90deg, #ff7705 0%, #ffb347 40%, #ff7705 60%, #ff4500 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "organicShimmer 2.8s linear infinite" }}>
                Organic Growth
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-6xl font-bold leading-[1.1] mb-8 text-white text-left">
                How United Technologies Solutions Helped{" "}
                <span className="gradient-text">qBotica Accelerate Organic Growth</span>{" "}
                Through Strategic SEO
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-left">
                A comprehensive SEO campaign that improved search visibility, increased qualified website traffic, and generated stronger inbound opportunities for qBotica in a highly competitive technology and automation market.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col gap-5 pb-8 overflow-visible">
              {[
                { value: "187%", label: "Organic Traffic Growth" },
                { value: "3X",   label: "Increase in Qualified Leads" },
                { value: "92%",  label: "Improvement in SEO ROI" },
              ].map((stat, index) => (
                <motion.div key={stat.label} custom={index} initial="hidden" animate="visible" variants={fadeUp}
                  className="relative rounded-2xl p-6 lg:p-7 border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-primary/40 hover:bg-primary/[0.06] hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,119,5,0.15)] transition-all duration-500 group cursor-default">
                  <div className="absolute inset-x-0 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-base md:text-lg text-muted-foreground leading-relaxed">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div className="bg-[#0a0f1a]">
        <div className="section-container py-20 space-y-24">

          {/* ── Overview ─────────────────────────────────────── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <SectionLabel>Overview</SectionLabel>
            <ul className="space-y-5">
              {overviewPoints.map((text, index) => (
                <motion.li key={index} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground leading-9">{text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Challenge ────────────────────────────────── */}
          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <SectionLabel>Challenge</SectionLabel>
              <div className="mb-10">
                <p className="text-muted-foreground text-lg md:text-xl leading-9">
                  Before the SEO campaign began, qBotica encountered several barriers that limited organic growth and reduced opportunities to generate inbound business.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {challenges.map((c, i) => (
                <motion.div key={c.num} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
                  <div className="gradient-card rounded-3xl p-8 border border-primary/10 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,119,5,0.25)] transition-all duration-500 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl font-bold text-primary">{c.num}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{c.title}</h3>
                    </div>
                    <div className="text-muted-foreground pl-16">
                      {openChallenge === i ? (
                        <div>{c.body}</div>
                      ) : (
                        <p className="text-base leading-8 line-clamp-2 text-muted-foreground/70">
                          {i === 0 && "The website struggled to rank for highly competitive industry keywords..."}
                          {i === 1 && "While other marketing channels provided occasional traffic..."}
                          {i === 2 && "A detailed website audit revealed several technical issues..."}
                          {i === 3 && "Many service pages lacked comprehensive keyword targeting..."}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setOpenChallenge(openChallenge === i ? null : i)}
                      className="mt-4 ml-16 text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all bg-transparent border-none outline-none"
                    >
                      {openChallenge === i ? "Read Less ↑" : "Read More ↓"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── SEO Strategy ─────────────────────────────────── */}
          <div>
            <SectionLabel>SEO Strategy Implemented</SectionLabel>
            <div className="mb-4">
              <p className="text-muted-foreground text-lg md:text-xl leading-9">
                United Technologies Solutions developed a multi-layered SEO strategy designed to improve technical performance, strengthen content relevance, and increase search authority over time.
              </p>
            </div>
            <div className="mb-12">
              <p className="text-muted-foreground text-lg md:text-xl leading-9">
                Rather than focusing on short-term gains, the campaign emphasized sustainable organic growth.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10">
              {/* Left active phase box */}
<motion.div key={activePhase}
  initial={{ opacity: 0, y: 20, boxShadow: "0 0 40px rgba(255,119,5,0.3)", borderColor: "rgba(255,119,5,0.6)" }}
  animate={{ opacity: 1, y: 0, boxShadow: "0 0 0px rgba(255,119,5,0)", borderColor: "rgba(255,255,255,0.07)" }}
  transition={{ duration: 0.6 }}
  className="rounded-3xl border bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl p-10 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(255,119,5,0.2)] hover:-translate-y-1 transition-all duration-500">

                <p className="text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-3">{seoPhases[activePhase].phase}</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">{seoPhases[activePhase].title}</h3>
                {seoPhases[activePhase].intro.map((t, i) => (
                  <p key={i} className="text-muted-foreground text-base md:text-lg leading-8 mb-4">{t}</p>
                ))}
                <h4 className="text-sm uppercase tracking-[0.2em] text-white/70 mt-6 mb-4">{seoPhases[activePhase].label}</h4>
                <div className="flex flex-wrap gap-2 mb-6">{seoPhases[activePhase].tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                <p className="text-muted-foreground text-base md:text-lg leading-8">{seoPhases[activePhase].outro}</p>
              </motion.div>

              {/* Right phase selector — hover effect added */}
              <div className="flex flex-col gap-4">
                {seoPhases.map((phase, index) => (
                  <div
                    key={phase.phase}
                    onMouseEnter={() => setActivePhase(index)}
                    className={`cursor-pointer rounded-2xl p-6 border transition-all duration-500 group ${
                      activePhase === index
                        ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(255,119,5,0.25),0_20px_50px_rgba(255,119,5,0.15)] scale-[1.02]"
                        : "border-white/[0.07] bg-white/[0.03] hover:border-primary/40 hover:bg-primary/[0.06] hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,119,5,0.2)] hover:-translate-y-1"
                    }`}
                  >
                    <p className="text-primary text-xs uppercase tracking-[0.25em] font-semibold mb-2">{phase.phase}</p>
                    <h3 className="text-lg font-bold group-hover:text-white transition-colors duration-300">{phase.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Results ───────────────────────────────────── */}
          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <SectionLabel>Results</SectionLabel>
              <div className="mb-10">
                <p className="text-muted-foreground text-lg md:text-xl leading-9">
                  The combined impact of technical optimization, content development, authority building, and user experience improvements produced measurable growth for qBotica.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <motion.div key={result.title} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl p-8 md:p-10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,119,5,0.12)] transition-all duration-500 group">
                  <div className="absolute inset-x-0 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-3">{result.metric}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{result.title}</h3>
                  <p className="text-muted-foreground text-base leading-8 mb-5">{result.description}</p>
                  <div className={`overflow-hidden transition-all duration-500 ${openResult === index ? "max-h-[1200px] opacity-100 mb-6" : "max-h-0 opacity-0"}`}>
                    {result.content}
                  </div>
                  <button
                    onClick={() => setOpenResult(openResult === index ? null : index)}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-orange-300 transition-colors duration-300 bg-transparent border-none outline-none"
                  >
                    {openResult === index ? "View Less ↑" : "View More ↓"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Why It Worked ────────────────────────────────── */}
          <div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <SectionLabel>Why the Strategy Worked</SectionLabel>
              <div className="mb-3">
                <p className="text-muted-foreground text-lg md:text-xl leading-9 ">
                  The success of the campaign was not the result of a single tactic.
                </p>
              </div>
              <div className="mb-10">
                <p className="text-muted-foreground text-lg md:text-xl leading-9">
                  Instead, it came from combining multiple SEO disciplines into a unified strategy.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Strong technical SEO foundation","Search intent-focused content","Strategic keyword targeting","Authority-building initiatives","User experience improvements","Continuous performance monitoring"].map((f, i) => (
                <motion.div key={f} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={fadeUp}
                  className="glass-card flex items-start gap-4 p-6 rounded-2xl border border-primary/10 hover:border-primary/40 hover:bg-primary/[0.04] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,119,5,0.2)] transition-all duration-500">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-xs">✓</span>
                  </div>
                  <span className="text-base font-medium text-white/80 leading-7">{f}</span>
                </motion.div>
              ))}
            </div>

            <div className="mb-10">
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-muted-foreground text-lg md:text-xl leading-9 mt-10 ">
                This integrated approach allowed qBotica to achieve measurable and sustainable growth.
              </motion.p>
            </div>

            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-muted-foreground text-xl md:text-2xl leading-9 mt-12 max-w-2xl">
              This integrated approach allowed qBotica to achieve measurable and sustainable growth.
            </motion.p>
          </div>

          {/* ── Looking Ahead ───────────────────────────────────── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <SectionLabel>Looking Ahead</SectionLabel>
            <div className="glass-card relative rounded-3xl border border-primary/10 p-8 md:p-10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,119,5,0.1)] transition-all duration-500 group">
              <div className="absolute inset-x-0 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <p className="text-muted-foreground text-base md:text-lg leading-9">Organic search continues to be one of the most valuable channels for long-term business growth.</p>
                <p className="text-muted-foreground text-base md:text-lg leading-9">As competition within the technology and automation sector increases, maintaining strong search visibility remains essential for attracting new customers and expanding market reach.</p>
                <p className="text-muted-foreground text-base md:text-lg leading-9">Through its partnership with United Technologies Solutions, qBotica established a stronger digital foundation that supports continued growth, improved discoverability, and increased lead-generation opportunities.</p>
              </div>
            </div>
          </motion.div>

          {/* ── Conclusion ───────────────────────────────────── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <SectionLabel>Conclusion</SectionLabel>
            <div className="glass-card relative rounded-3xl border border-primary/10 p-8 md:p-10 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,119,5,0.1)] transition-all duration-500 group">
              <div className="absolute inset-x-0 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="space-y-4">
                <p className="text-muted-foreground text-base md:text-lg leading-9">The qBotica SEO campaign demonstrates how a structured, data-driven SEO strategy can transform online visibility and generate measurable business results.</p>
                <p className="text-muted-foreground text-base md:text-lg leading-9">By addressing technical challenges, improving content quality, strengthening authority, and enhancing user experience, United Technologies Solutions helped qBotica achieve substantial improvements in traffic, rankings, lead generation, and return on investment.</p>
                <p className="text-muted-foreground text-base md:text-lg leading-9">The results highlight the long-term value of strategic SEO and its ability to create sustainable growth in competitive industries.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @keyframes organicShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default TransportationCaseStudy;

