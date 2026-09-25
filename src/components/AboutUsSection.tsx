import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { renderDescription } from "@/lib/richText";
import Footer from "@/components/Footer";
import { fetchFooter } from "@/lib/strapi";

type SessionData = {
  session_title?: string;
  session_description?: string;
};

type SessionTab = {
  tab_title?: string;
  sessions?: SessionData[];
};

type AboutUsData = {
  main_title?: string;
  eyebrow?: string;
  description?: string;
  session_tabs?: SessionTab[];
  cta_text?: string;
  cta_link_label?: string;
  cta_link_url?: string;
};

type Props = {
  data?: AboutUsData;
};

const AboutUsSection = ({ data }: Props) => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const footer = await fetchFooter();
        setFooterData(footer);
      } catch (footerError) {
        console.error("AboutUsSection: failed to load footer", footerError);
        setFooterData(null);
      }
    };

    loadFooter();
  }, []);

  if (!data) return null;

  const tabs = data.session_tabs || [];

  return (
    <>
      <section
        id="about"
        ref={ref}
        className="relative w-full bg-background py-20 md:py-24"
      >
        <div className="section-container">

          {/* =================================================
              PAGE INTRO
          ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* EYEBROW */}

            {data.eyebrow && (
              <span className="inline-block px-4 py-2 rounded-full bg-card border border-border text-muted-foreground text-sm mb-6">
                {data.eyebrow}
              </span>
            )}

            {/* TITLE */}

            {data.main_title && (
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {data.main_title}
              </h2>
            )}

            {/* DESCRIPTION */}

            {data.description && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mb-4">
                {data.description}
              </p>
            )}

            {/* LOOKING FOR OUR SERVICES? (CTA) */}

            {data.cta_text && (
              <p className="text-sm md:text-base text-muted-foreground">
                {data.cta_text}{" "}
                {data.cta_link_url && data.cta_link_label && (
                  <>
                    <a
                      href={data.cta_link_url}
                      className="text-primary font-semibold hover:underline"
                    >
                      {data.cta_link_label}
                    </a>
                    .
                  </>
                )}
              </p>
            )}
          </motion.div>

          {/* =================================================
              SESSION CARDS
          ================================================= */}

          <div className="space-y-8">

            {tabs.map((tab, tabIndex) => {

              const sessions = tab.sessions || [];

              return (
                <div
                  key={`${tab.tab_title}-${tabIndex}`}
                  className="space-y-8"
                >

                  {sessions.map((session, sessionIndex) => (

                    <motion.div
                      key={`${session.session_title}-${sessionIndex}`}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={
                        inView
                          ? {
                              opacity: 1,
                              y: 0,
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.6,
                        delay:
                          (tabIndex + sessionIndex) * 0.1,
                      }}
                      className="rounded-3xl bg-card border border-border p-8 md:p-10"
                    >

                      {/* SESSION TITLE */}

                      {session.session_title && (
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                          {session.session_title}
                        </h3>
                      )}

                      {/* SESSION DESCRIPTION */}

                      {renderDescription(
                        session.session_description
                      )}

                    </motion.div>

                  ))}

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {footerData && <Footer data={footerData} />}
    </>
  );
};

export default AboutUsSection;