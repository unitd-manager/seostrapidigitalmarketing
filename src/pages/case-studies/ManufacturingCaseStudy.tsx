import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const ManufacturingCaseStudy = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-black pt-16 pb-20">
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary blur-[120px] rounded-full"></div>
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>
              <p className="uppercase tracking-[0.2em] text-primary text-sm font-semibold mb-5">
                Manufacturing Industry
              </p>

              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
                How We Helped a Manufacturing Company Generate More SEO Leads
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Helped a manufacturing company improve organic rankings,
increase industrial leads, and generate qualified inquiries.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">

                <div className="
                    glass-card p-8
                    border border-primary/10
                    hover:border-primary/40
                    hover:shadow-[0_0_30px_rgba(255,119,5,0.2)]
                    hover:-translate-y-1
                    transition-all duration-500
                    ">
                  <h3 className="text-3xl font-bold text-primary">187%</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Traffic Growth
                  </p>
                </div>

                <div className="
                    glass-card p-8
                    border border-primary/10
                    hover:border-primary/40
                    hover:shadow-[0_0_30px_rgba(255,119,5,0.2)]
                    hover:-translate-y-1
                    transition-all duration-500
                    ">
                  <h3 className="text-3xl font-bold text-primary">3X</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    More Leads
                  </p>
                </div>

                <div className="
                    glass-card p-5 text-center
                    hover:scale-105
                    hover:border-primary/40
                    hover:shadow-[0_0_30px_rgba(255,119,5,0.3)]
                    transition-all duration-500
                    ">
                  <h3 className="text-3xl font-bold text-primary">92%</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    ROI Increase
                  </p>
                </div>

              </div>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop"
                alt="Manufacturing SEO"
                className="
                            w-full rounded-3xl border border-primary/20
                            shadow-[0_0_40px_rgba(255,119,5,0.25)]
                            hover:scale-[1.02]
                            hover:shadow-[0_0_60px_rgba(255,119,5,0.45)]
                            transition-all duration-500
                            "
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="section-container max-w-5xl">

          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Overview
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              The client was struggling with low organic visibility,
              declining inbound traffic, and weak keyword rankings in a
              competitive manufacturing market. They needed a scalable
              SEO strategy that could generate consistent leads and improve
              long-term search presence.
            </p>
          </div>

          {/* Challenge */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-primary">
              Challenges
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="
                gradient-card rounded-2xl p-8
                border border-primary/10
                hover:border-primary/40
                hover:-translate-y-2
                hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
                transition-all duration-500
                group
                ">
                <h3 className="text-xl font-semibold mb-3">
                  Low Search Visibility
                </h3>

                <p className="text-muted-foreground">
                  The website ranked poorly for high-intent transportation keywords.
                </p>
              </div>

              <div className="
                gradient-card rounded-2xl p-8
                border border-primary/10
                hover:border-primary/40
                hover:-translate-y-2
                hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
                transition-all duration-500
                group
                ">
                <h3 className="text-xl font-semibold mb-3">
                  Weak Lead Flow
                </h3>

                <p className="text-muted-foreground">
                  Paid ads generated temporary traffic but lacked sustainable growth.
                </p>
              </div>

              <div className="
                gradient-card rounded-2xl p-8
                border border-primary/10
                hover:border-primary/40
                hover:-translate-y-2
                hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
                transition-all duration-500
                group
                ">
                <h3 className="text-xl font-semibold mb-3">
                  Technical SEO Issues
                </h3>

                <p className="text-muted-foreground">
                  Site speed, indexing, and metadata problems impacted rankings.
                </p>
              </div>

              <div className="
                gradient-card rounded-2xl p-8
                border border-primary/10
                hover:border-primary/40
                hover:-translate-y-2
                hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
                transition-all duration-500
                group
                ">
                <h3 className="text-xl font-semibold mb-3">
                  Poor Content Structure
                </h3>

                <p className="text-muted-foreground">
                  Existing pages lacked optimized content and keyword targeting.
                </p>
              </div>

            </div>
          </div>

          {/* Solution */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-primary">
              Solution
            </h2>

            <div className="space-y-6">

              <div className="
                glass-card p-8
                border border-primary/10
                hover:border-primary/40
                hover:shadow-[0_0_30px_rgba(255,119,5,0.2)]
                hover:-translate-y-1
                transition-all duration-500
                ">
                <h3 className="text-2xl font-semibold mb-4">
                  Technical SEO Optimization
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Improved site architecture, indexing, Core Web Vitals,
                  metadata, and crawl performance.
                </p>
              </div>

              <div className="
                    glass-card p-8
                    border border-primary/10
                    hover:border-primary/40
                    hover:shadow-[0_0_30px_rgba(255,119,5,0.2)]
                    hover:-translate-y-1
                    transition-all duration-500
                    ">
                <h3 className="text-2xl font-semibold mb-4">
                  Content Strategy
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Developed optimized service pages and keyword-focused content
                  to improve rankings and conversions.
                </p>
              </div>

              <div className="
                    glass-card p-8
                    border border-primary/10
                    hover:border-primary/40
                    hover:shadow-[0_0_30px_rgba(255,119,5,0.2)]
                    hover:-translate-y-1
                    transition-all duration-500
                    ">
                <h3 className="text-2xl font-semibold mb-4">
                  Local SEO & Authority Building
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  Enhanced local search presence and implemented backlink strategies
                  for domain authority growth.
                </p>
              </div>

            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-primary">
              Results
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="
                    gradient-card rounded-2xl p-8
                    border border-primary/10
                    hover:border-primary/40
                    hover:-translate-y-2
                    hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
                    transition-all duration-500
                    group
                    ">
                <h3 className="text-5xl font-bold text-primary mb-3">
                  320%
                </h3>

                <p className="text-muted-foreground">
                  Organic Traffic Growth
                </p>
              </div>

              <div className="
                    gradient-card rounded-2xl p-8
                    border border-primary/10
                    hover:border-primary/40
                    hover:-translate-y-2
                    hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
                    transition-all duration-500
                    group
                    ">
                <h3 className="text-5xl font-bold text-primary mb-3">
                  180%
                </h3>

                <p className="text-muted-foreground">
                  Increase in Leads
                </p>
              </div>

              <div className="
                    gradient-card rounded-2xl p-8
                    border border-primary/10
                    hover:border-primary/40
                    hover:-translate-y-2
                    hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
                    transition-all duration-500
                    group
                    ">
                <h3 className="text-5xl font-bold text-primary mb-3">
                  Top 3
                </h3>

                <p className="text-muted-foreground">
                  Rankings for Core Keywords
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ManufacturingCaseStudy;