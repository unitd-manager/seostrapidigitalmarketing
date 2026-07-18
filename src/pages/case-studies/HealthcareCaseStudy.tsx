import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";


const HealthcareCaseStudy = () => {

const [showTechnicalSEO, setShowTechnicalSEO] = useState(false);
  const [showContentStrategy, setShowContentStrategy] = useState(false);
  const [showAuthority, setShowAuthority] = useState(false);

const [showChallenge1, setShowChallenge1] = useState(false);
const [showChallenge2, setShowChallenge2] = useState(false);
const [showChallenge3, setShowChallenge3] = useState(false);
const [showChallenge4, setShowChallenge4] = useState(false);

const [openResult, setOpenResult] = useState(null);

  return (
    <div className="min-h-screen bg-background text-white">
      
      <Header />

      {/* Hero Section */}
      {/*<section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-black pt-16 pb-20">
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary blur-[120px] rounded-full"></div>
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            {/*<div>
              <p className="uppercase tracking-[0.2em] text-primary text-sm font-semibold mb-5">
                Healthcare Industry
              </p>

              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
How We Helped Dr Pal's NewME Increase Organic Visibility and Generate More Qualified Health Program Leads
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
A comprehensive SEO growth strategy that improved search rankings, increased organic traffic, and generated high-intent inquiries for Dr Pal's NewME, a leading lifestyle medicine and sustainable weight management platform              </p>

              {/* Stats */}
              {/*<div className="grid grid-cols-3 gap-4">

                <div className="
                    glass-card p-8
                    border border-primary/10
                    hover:border-primary/40
                    hover:shadow-[0_0_30px_rgba(255,119,5,0.2)]
                    hover:-translate-y-1
                    transition-all duration-500
                    ">
                  <h3 className="text-3xl font-bold text-primary">215%</h3>
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
                  <h3 className="text-3xl font-bold text-primary">3.5X</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    More Qualified Leads

                  </p>
                </div>

                <div className="
                    glass-card p-5 text-center
                    hover:scale-105
                    hover:border-primary/40
                    hover:shadow-[0_0_30px_rgba(255,119,5,0.3)]
                    transition-all duration-500
                    ">
                  <h3 className="text-3xl font-bold text-primary">96%</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    ROI Increase
                  </p>
                </div>

              </div>
            </div>

            {/* Right */}
            {/*<motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop"
                alt="Healthcare SEO"
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
      </section>*/}

<section className="relative overflow-hidden bg-[#080c14] pt-20 pb-28">

  {/* Background Grid */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,119,5,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,119,5,0.6) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />

  {/* Orange Glow */}
  <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/10 blur-[100px]" />

  <div className="section-container relative z-10">

    <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center">

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-start"
      >

        <span
          className="inline-block text-base font-semibold tracking-[0.2em] uppercase mb-6"
          style={{
            background:
              "linear-gradient(90deg,#ff7705 0%,#ffb347 40%,#ff7705 60%,#ff4500 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Healthcare Industry
        </span>

        <h1 className="font-display text-4xl md:text-6xl lg:text-[68px] font-bold leading-[1.05] mb-8 text-white">

          How We Helped{" "}

          <span className="gradient-text">
            Dr Pal's NewME
          </span>

          {" "}Increase Organic Visibility and Generate More Qualified Health Program Leads

        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">

          A comprehensive SEO growth strategy that improved search rankings,
          increased organic traffic, and generated high-intent inquiries for
          Dr Pal's NewME, a leading lifestyle medicine and sustainable
          weight management platform.

        </p>

      </motion.div>



      {/* RIGHT - Stats */}

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex flex-col gap-5"
      >

        {[
          {
            value: "215%",
            label: "Organic Traffic Growth",
          },

          {
            value: "3.5X",
            label: "Increase in Qualified Leads",
          },

          {
            value: "96%",
            label: "Improvement in SEO ROI",
          },

        ].map((stat) => (

          <div
            key={stat.label}
            className="
              relative
              rounded-2xl
              p-7
              border border-white/[0.08]
              bg-white/[0.03]
              backdrop-blur-xl

              hover:border-primary/40
              hover:bg-primary/[0.06]
              hover:-translate-y-1

              hover:shadow-[0_25px_60px_rgba(255,119,5,0.15)]

              transition-all duration-500
              group
            "
          >

            <div className="
              absolute inset-x-0 top-0 h-[1px]
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-primary/50
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity duration-500
            " />

            <div className="text-5xl font-bold text-primary mb-2">
              {stat.value}
            </div>

            <div className="text-lg text-muted-foreground leading-relaxed">
              {stat.label}
            </div>

          </div>

        ))}

      </motion.div>

    </div>

  </div>

</section>



      {/* Overview */}
      <section className="py-20">
        <div className="section-container max-w-5xl">

         {/* <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Overview
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              The client was struggling with low organic visibility,
              declining inbound traffic, and weak keyword rankings in a
              competitive healthcare market. They needed a scalable
              SEO strategy that could generate consistent leads and improve
              long-term search presence.
            </p>
          </div>*/}

<div className="section-container max-w-5xl">
  <div className="mb-16">

    {/*<p className="text-primary font-semibold text-2xl mb-3 uppercase tracking-wider">
      Healthcare SEO
    </p>*/}

    {/*<h2 className="text-4xl font-bold mb-6 text-primary">
      Overview
    </h2>*/}

<div className="flex items-center gap-4 mb-6 -ml-20">
  <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
    Overview
  </h2>
  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
</div>

    <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-xl font-bold">✓</span>
        </div>

        <p>
          <span className="font-semibold text-foreground">
            Dr Pal's NewME
          </span>{" "}
          is a lifestyle medicine and weight management platform focused on
          helping individuals achieve sustainable weight loss, better gut
          health, and long-term wellness through habit-based interventions
          rather than quick-fix solutions.
        </p>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-xl font-bold">✓</span>
        </div>

        <p>
          While the platform had established credibility through educational
          content, patient success stories, and expert guidance from Dr. Pal,
          its website faced challenges in achieving strong organic visibility
          within a highly competitive health and wellness market.
        </p>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-xl font-bold">✓</span>
        </div>

        <p>
          The primary goal was to build a scalable SEO strategy capable of
          attracting users actively searching for weight management,
          lifestyle medicine, gut health, nutrition, and sustainable wellness
          solutions while improving long-term search engine visibility.
        </p>
      </div>

    </div>
  </div>
</div>


      


{/* Challenge */}
<div className="mb-16">

  {/*<h2 className="text-4xl font-bold mb-10 text-primary">
    Challenges
  </h2>*/}



<div className="flex items-center gap-4 mb-6 -ml-20">
  <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
    Challenges
  </h2>
  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
</div>


  <div className="grid md:grid-cols-2 gap-6">

    {/* Card 1 */}

    <div className="gradient-card rounded-3xl p-8 border border-primary/10 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,119,5,0.25)] transition-all duration-500">

      <div className="flex items-center gap-5 mb-5">
        <span className="text-5xl font-bold text-primary">01</span>

        <h3 className="text-2xl font-semibold">
          Low Search Visibility
        </h3>
      </div>

      <p className="text-muted-foreground leading-relaxed">

        The website struggled to rank for high-intent healthcare

        {showChallenge1 && (
          <>
            , weight loss, gut health, and lifestyle medicine
            keywords in a highly competitive search landscape.
          </>
        )}

      </p>

      <button
        onClick={() => setShowChallenge1(!showChallenge1)}
        className="mt-5 text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
      >
        {showChallenge1 ? "Read Less ↑" : "Read More ↓"}
      </button>

    </div>
    {/* Card 2 */}

    <div className="gradient-card rounded-3xl p-8 border border-primary/10 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,119,5,0.25)] transition-all duration-500">

      <div className="flex items-center gap-5 mb-5">
        <span className="text-5xl font-bold text-primary">02</span>

        <h3 className="text-2xl font-semibold">
          Weak Lead Flow
        </h3>
      </div>

      <p className="text-muted-foreground leading-relaxed">

        Most traffic was generated through existing brand awareness

        {showChallenge2 && (
          <>
            {" "}and social media channels, resulting in inconsistent
            lead generation and limited organic acquisition opportunities.
          </>
        )}

      </p>

      <button
        onClick={() => setShowChallenge2(!showChallenge2)}
        className="mt-5 text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
      >
        {showChallenge2 ? "Read Less ↑" : "Read More ↓"}
      </button>

    </div>
    {/* Card 3 */}

    <div className="gradient-card rounded-3xl p-8 border border-primary/10 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,119,5,0.25)] transition-all duration-500">

      <div className="flex items-center gap-5 mb-5">
        <span className="text-5xl font-bold text-primary">03</span>

        <h3 className="text-2xl font-semibold">
          Technical SEO Issues
        </h3>
      </div>

      <p className="text-muted-foreground leading-relaxed">

        Website indexing, crawlability, metadata optimization

        {showChallenge3 && (
          <>
            , page speed, and technical SEO elements required
            improvement to support stronger search engine performance.
          </>
        )}

      </p>

      <button
        onClick={() => setShowChallenge3(!showChallenge3)}
        className="mt-5 text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
      >
        {showChallenge3 ? "Read Less ↑" : "Read More ↓"}
      </button>

    </div>
    {/* Card 4 */}

    <div className="gradient-card rounded-3xl p-8 border border-primary/10 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,119,5,0.25)] transition-all duration-500">

      <div className="flex items-center gap-5 mb-5">
        <span className="text-5xl font-bold text-primary">04</span>

        <h3 className="text-2xl font-semibold">
          Poor Content Structure
        </h3>
      </div>

      <p className="text-muted-foreground leading-relaxed">

        Several pages lacked comprehensive keyword targeting

        {showChallenge4 && (
          <>
            , search-intent optimization, content depth,
            and internal linking strategies needed to compete
            effectively in healthcare search results.
          </>
        )}

      </p>

      <button
        onClick={() => setShowChallenge4(!showChallenge4)}
        className="mt-5 text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all"
      >
        {showChallenge4 ? "Read Less ↑" : "Read More ↓"}
      </button>

    </div>

  </div>

</div>

{/* Solution */}
<div className="mb-16">
  {/*<h2 className="text-4xl font-bold mb-8 text-primary">
    Solution
  </h2>*/}
  <div className="flex items-center gap-4 mb-6 -ml-20">
  <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
    Solution
  </h2>
  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
</div>

  <div className="space-y-6">

    {/* Technical SEO */}

    <div className="glass-card p-8 border border-primary/10 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(255,119,5,0.2)] hover:-translate-y-1 transition-all duration-500">

      <h3 className="text-2xl font-semibold mb-4">
        Technical SEO Optimization
      </h3>

      <p className="text-muted-foreground leading-relaxed mb-6">
        The United Technologies Solutions team conducted a comprehensive
        technical SEO audit and implemented improvements across the website.
      </p>

      <div className="space-y-4">

        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">✓</span>
          </div>

          <p className="text-muted-foreground pt-1">
            Website architecture improvements
          </p>
        </div>

        {!showTechnicalSEO ? (

          <button
            onClick={() => setShowTechnicalSEO(true)}
            className="ml-[52px] text-primary font-semibold hover:underline"
          >
            Read More ↓
          </button>

        ) : (

          <>

            {[
              "Metadata optimization",
              "XML sitemap enhancement",
              "Crawlability improvements",
              "Indexing optimization",
              "Core Web Vitals improvements",
              "Mobile usability enhancements",
              "Internal linking optimization"
            ].map((item, index) => (

              <div key={index} className="flex items-start gap-4">

                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>

                <p className="text-muted-foreground pt-1">
                  {item}
                </p>

              </div>

            ))}

            <p className="text-muted-foreground ml-[52px] mt-6 leading-relaxed">
              These improvements created a stronger technical foundation
              for long-term organic growth.
            </p>

            <button
              onClick={() => setShowTechnicalSEO(false)}
              className="ml-[52px] mt-4 text-primary font-semibold hover:underline"
            >
              Read Less ↑
            </button>

          </>

        )}

      </div>

    </div>



    {/* Content Strategy */}

    <div className="glass-card p-8 border border-primary/10 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(255,119,5,0.2)] hover:-translate-y-1 transition-all duration-500">

      <h3 className="text-2xl font-semibold mb-4">
        Content Strategy
      </h3>


      <p className="text-muted-foreground leading-relaxed mb-6">
        A healthcare-focused content strategy was developed to align with
        user search intent and strengthen topical authority.
      </p>

      <div className="space-y-4">

        <div className="flex items-start gap-4">

          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">✓</span>
          </div>

          <p className="text-muted-foreground pt-1">
            Service page optimization
          </p>

        </div>

        {!showContentStrategy ? (

          <button
            onClick={() => setShowContentStrategy(true)}
            className="ml-[52px] text-primary font-semibold hover:underline"
          >
            Read More ↓
          </button>

        ) : (

          <>

            {[
              "Health-focused keyword research",
              "SEO content development",
              "Blog content planning",
              "FAQ optimization",
              "Topic cluster implementation",
              "Internal content linking"
            ].map((item, index) => (

              <div key={index} className="flex items-start gap-4">

                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>

                <p className="text-muted-foreground pt-1">
                  {item}
                </p>

              </div>

            ))}

            <p className="text-muted-foreground ml-[52px] mt-6 leading-relaxed">
              Content was designed to address common patient concerns while
              improving visibility for high-value healthcare and wellness
              search terms.
            </p>

            <button
              onClick={() => setShowContentStrategy(false)}
              className="ml-[52px] mt-4 text-primary font-semibold hover:underline"
            >
              Read Less ↑
            </button>

          </>

        )}

      </div>

    </div>



    {/* Authority Building */}

    <div className="glass-card p-8 border border-primary/10 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(255,119,5,0.2)] hover:-translate-y-1 transition-all duration-500">

      <h3 className="text-2xl font-semibold mb-4">
        Authority Building & Brand Visibility
      </h3>

      <p className="text-muted-foreground leading-relaxed mb-6">
        To strengthen online trust and search authority, United Technologies
        Solutions implemented a strategic authority-building campaign.
      </p>

      <div className="space-y-4">

        <div className="flex items-start gap-4">

          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">✓</span>
          </div>

          <p className="text-muted-foreground pt-1">
            High-quality backlink acquisition
          </p>

        </div>

        {!showAuthority ? (

          <button
            onClick={() => setShowAuthority(true)}
            className="ml-[52px] text-primary font-semibold hover:underline"
          >
            Read More ↓
          </button>

        ) : (

          <>

            {[
              "Healthcare citation building",
              "Brand mention opportunities",
              "Digital PR support",
              "Authority signal enhancement"
            ].map((item, index) => (

              <div key={index} className="flex items-start gap-4">

                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>

                <p className="text-muted-foreground pt-1">
                  {item}
                </p>

              </div>

            ))}

            <p className="text-muted-foreground ml-[52px] mt-6 leading-relaxed">
              These initiatives helped improve domain authority and increase
              search engine trust.
            </p>

            <button
              onClick={() => setShowAuthority(false)}
              className="ml-[52px] mt-4 text-primary font-semibold hover:underline"
            >
              Read Less ↑
            </button>

          </>

        )}

      </div>

    </div>

  </div>

</div>

          {/* Results */}
{/*<div className="mb-20">

  {/*<h2 className="text-4xl font-bold text-primary mb-6">
    Results
  </h2>*/}


{/*<div className="flex items-center gap-4 mb-6 -ml-20">
  <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
    Results
  </h2>
  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
</div>



  <p className="text-muted-foreground text-xl leading-9 mb-14 max-w-3xl">
    The combined impact of technical SEO, healthcare-focused content,
    and authority building delivered significant improvements in
    organic visibility, qualified leads, and keyword rankings.
  </p>


  <div className="space-y-6">

    {[
      {
        metric: "215%",
        title: "Organic Traffic Growth",

        content: (
          <p className="text-muted-foreground leading-8 text-lg">
            The website experienced substantial growth in organic visibility,
            leading to a significant increase in qualified search traffic from
            users actively seeking healthcare and weight management solutions.
          </p>
        )
      },

      {
        metric: "3.5X",
        title: "Increase in Leads",

        content: (
          <p className="text-muted-foreground leading-8 text-lg">
            Improved search visibility and user-focused content generated
            a stronger flow of qualified inquiries from prospective patients
            interested in lifestyle medicine programs.
          </p>
        )
      },

      {
        metric: "Top 3",
        title: "Rankings for Core Keywords",

        content: (
          <p className="text-muted-foreground leading-8 text-lg">
            Multiple high-intent healthcare, weight management, and wellness
            keywords achieved first-page visibility, with several reaching
            Top 3 positions in search results.
          </p>
        )
      }

    ].map((result, index) => (

      <div
        key={index}
        className="
          relative overflow-hidden
          rounded-3xl
          border border-white/[0.07]
          bg-gradient-to-br from-white/[0.04] to-transparent
          backdrop-blur-xl
          p-8 md:p-10
          hover:border-primary/30
          hover:-translate-y-1
          hover:shadow-[0_25px_60px_rgba(255,119,5,0.12)]
          transition-all duration-500
          group
        "
      >

        {/* top orange line */}

        {/*<div className="
          absolute inset-x-0 top-0 h-[1px]
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-primary/40
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
        "></div>


        {/* Metric */}

        {/*<div className="text-5xl md:text-6xl font-bold text-primary mb-4">
          {result.metric}
        </div>


        {/* Title */}

        {/*<h3 className="text-2xl font-bold text-white mb-6">
          {result.title}
        </h3>*/}


        {/* Expand content */}

       {/* <div
          className={`
            overflow-hidden transition-all duration-500
            ${openResult === index
              ? "max-h-[400px] opacity-100 mb-6"
              : "max-h-0 opacity-0"
            }
          `}
        >

          {result.content}

        </div>


        {/* Button */}

        {/*<button

          onClick={() =>
            setOpenResult(
              openResult === index ? null : index
            )
          }

          className="
            inline-flex items-center gap-2
            text-primary
            font-semibold
            hover:text-orange-300
            transition-colors duration-300
          "
        >

          {openResult === index
            ? "View Less"
            : "View More"
          }

          <span
            className={`
              transition-transform duration-300
              ${openResult === index ? "rotate-180" : ""}
            `}
          >
            ↓
          </span>

        </button>

      </div>

    ))}

  </div>

</div>


{/* Additional Business Impact */}
<div className="mt-20 mb-20">

  {/*<h2 className="text-4xl font-bold text-primary mb-8">
    Additional Business Impact
  </h2>*/}



  <div className="flex items-center gap-4 mb-6 -ml-20">
  <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
    Additional Business Impact
  </h2>
  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
</div>

  <p className="text-muted-foreground text-lg mb-8">
    Beyond rankings and traffic growth, the campaign delivered measurable
    improvements across key business metrics:
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {[
      "Increased patient engagement",
      "Higher website session duration",
      "Improved conversion rates",
      "Greater brand visibility",
      "Enhanced topical authority",
      "Stronger organic lead pipeline"
    ].map((item, index) => (

      <div
        key={index}
        className="
          glass-card p-6 rounded-2xl
          border border-primary/10
          hover:border-primary/40
          hover:-translate-y-1
          hover:shadow-[0_0_25px_rgba(255,119,5,0.2)]
          transition-all duration-500
        "
      >
        <div className="flex items-center gap-4">

          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">✓</span>
          </div>

          <p className="text-lg">
            {item}
          </p>

        </div>
      </div>

    ))}

  </div>

</div>



{/* Why Strategy Worked */}

<div className="mb-20">

  {/*<h2 className="text-4xl font-bold text-primary mb-8">
    Why the Strategy Worked
  </h2>*/}




  <div className="flex items-center gap-4 mb-6 -ml-20">
  <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
    Why the Strategy Worked
  </h2>
  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
</div>

  <div className="
    glass-card p-10 rounded-3xl
    border border-primary/10
  ">

    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
      The success of the Dr Pal's NewME campaign was driven by a combination
      of technical SEO excellence, patient-focused content creation,
      search-intent optimization, and authority-building efforts.
    </p>

    <p className="text-lg text-muted-foreground leading-relaxed">
      By addressing both technical and content-related challenges,
      United Technologies Solutions created a scalable SEO framework
      that continues to support long-term growth.
    </p>

  </div>

</div>


{/* Key Results Summary */}
<div className="mb-20">

  {/*<h2 className="text-4xl font-bold text-primary mb-10">
    Key Results Summary
  </h2>*/}



  <div className="flex items-center gap-4 mb-6 -ml-20">
  <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
    key Results Summary
  </h2>
  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
</div>

  <div className="grid md:grid-cols-3 gap-6">

    {[
      {
        value: "215%",
        title: "Organic Traffic Growth",
      },
      {
        value: "3.5X",
        title: "Qualified Leads",
      },
      {
        value: "96%",
        title: "SEO ROI Increase",
      },
      {
        value: "Top 3",
        title: "Core Keyword Rankings",
      },
      {
        value: "Fully Optimized",
        title: "Technical SEO",
      },
      {
        value: "Successfully Implemented",
        title: "Content Strategy",
      },
    ].map((item, index) => (

      <div
        key={index}
        className="
          gradient-card
          rounded-3xl
          p-8
          border border-primary/10
          hover:border-primary/40
          hover:-translate-y-2
          hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
          transition-all duration-500
          text-center
        "
      >
        <h3 className="text-4xl font-bold text-primary mb-4">
          {item.value}
        </h3>

        <p className="text-lg text-muted-foreground">
          {item.title}
        </p>
      </div>

    ))}

    {/* Full width last box */}
    <div
      className="
        md:col-span-3
        gradient-card
        rounded-3xl
        p-8
        border border-primary/10
        hover:border-primary/40
        hover:shadow-[0_0_35px_rgba(255,119,5,0.25)]
        transition-all duration-500
        text-center
      "
    >

      <h3 className="text-4xl font-bold text-primary mb-4">
        Significantly Improved
      </h3>

      <p className="text-lg text-muted-foreground">
        Authority Building
      </p>

    </div>

  </div>

</div>


{/* Project Information */}
<div className="mb-20">

  {/*<h2 className="text-4xl font-bold text-primary mb-10">
    Project Information
  </h2>*/}



  <div className="flex items-center gap-4 mb-6 -ml-20">
  <h2 className="text-3xl font-bold tracking-widest text-amber-500 uppercase whitespace-nowrap">
    Project Information
  </h2>
  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 to-transparent" />
</div>

  <div className="
    glass-card
    rounded-3xl
    p-10
    border border-primary/10
    hover:border-primary/30
    transition-all duration-500
  ">

    <div className="grid md:grid-cols-2 gap-y-8 gap-x-16">

      <div>
        <p className="text-primary text-sm uppercase tracking-wider mb-2">
          Client
        </p>

        <h3 className="text-2xl font-semibold">
          Dr Pal's NewME
        </h3>
      </div>

      <div>
        <p className="text-primary text-sm uppercase tracking-wider mb-2">
          Industry
        </p>

        <h3 className="text-xl font-medium">
          Healthcare, Lifestyle Medicine &
          Weight Management
        </h3>
      </div>

      <div>
        <p className="text-primary text-sm uppercase tracking-wider mb-2">
          Services Provided
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Search Engine Optimization (SEO),
          Technical SEO, Content Strategy,
          Authority Building, Healthcare SEO
        </p>
      </div>

      <div>
        <p className="text-primary text-sm uppercase tracking-wider mb-2">
          Agency
        </p>

        <h3 className="text-xl font-medium">
          United Technologies Solutions
        </h3>
      </div>

      <div className="md:col-span-2">
        <p className="text-primary text-sm uppercase tracking-wider mb-2">
          Campaign Focus
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Organic Growth, Patient Acquisition,
          Search Visibility, Technical SEO,
          Content Optimization, Healthcare Authority Building,
          Lead Generation.
        </p>
      </div>

    </div>

  </div>

</div>






        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HealthcareCaseStudy;