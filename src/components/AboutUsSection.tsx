import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
};

type Props = {
  data?: AboutUsData;
};

const AboutUsSection = ({ data }: Props) => {
  if (!data) return null;

  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const tabs = data.session_tabs || [];

  /*
   * Render session description.
   *
   * Normal text -> paragraph
   * Lines starting with "-" -> bullet list
   */
  const renderDescription = (description?: string) => {
    if (!description) return null;

    const lines = description
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const bulletLines = lines.filter((line) =>
      line.startsWith("-")
    );

    const normalLines = lines.filter(
      (line) => !line.startsWith("-")
    );

    return (
      <div className="text-lg text-muted-foreground leading-relaxed">
        {normalLines.map((line, index) => (
          <p key={index} className="mb-3 last:mb-0">
            {line}
          </p>
        ))}

        {bulletLines.length > 0 && (
          <ul className="list-disc pl-6 space-y-3">
            {bulletLines.map((line, index) => (
              <li key={index}>
                {line.replace(/^-\s*/, "")}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
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
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
              {data.description}
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
  );
};

export default AboutUsSection;