import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "Transportation SEO Growth",
    description:
      "Helped a logistics company increase inbound leads through SEO optimization.",
    link: "/case-studies/transportation-seo-growth",
  },
  {
    title: "Healthcare Lead Generation",
    description:
      "Improved search visibility and patient inquiries for a healthcare client.",
    link: "/case-studies/healthcare-seo-growth",
  },
 
];

const CaseStudiesSection = () => {
  return (
    <section
      id="case-studies"
      className="py-20 bg-background"
    >
      <div className="section-container">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Case Studies
          </h2>

          <p className="text-primary tracking-[0.2em] uppercase mt-3 text-sm font-semibold">
            Real Projects. Real Results.
          </p>
        </div>

        {/* Cards */}
        {/* Cards */}
<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

  {caseStudies.map((study, index) => (
    <motion.div
      key={index}
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

      {/* Glow Background */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500">
        <div className="absolute -inset-1 bg-primary/10 blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Small Tag */}
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase tracking-widest font-semibold">
          Case Study
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
          {study.title}
        </h3>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          {study.description}
        </p>

        <a
          href={study.link}
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
          Read More →
        </a>

      </div>
    </motion.div>
     ))}

    </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;