import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { renderBlocks } from "@/lib/blocksRenderer";
import Footer from "@/components/Footer";
import { fetchFooter } from "@/lib/strapi";


const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

type ContactData = {
  eyebrow?: string;
  main_title?: string;
  description?: any;
  cta_text?: string;
  cta_link_label?: string;
  cta_link_url?: string;
  get_in_touch_title?: string;
  get_in_touch_details?: any;
  contact_form_title?: string;
  success_message?: string;
  form_footer_note?: string;

  // ---- NEW: dynamic form field labels/placeholders + button text ----
  name_placeholder?: string;
  email_placeholder?: string;
  subject_placeholder?: string;
  message_placeholder?: string;
  submit_button_text?: string;
  submit_button_loading_text?: string;
};

type Props = {
  data?: ContactData;
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactSection = ({ data }: Props) => {
  const [footerData, setFooterData] = useState<any>(null);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const footer = await fetchFooter();
        setFooterData(footer);
      } catch (footerError) {
        console.error("ContactSection: failed to load footer", footerError);
        setFooterData(null);
      }
    };

    loadFooter();
  }, []);

  if (!data) return null;

  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${STRAPI_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit: ${response.status}`);
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      console.error("ContactSection: submit failed", err);
      setError(
        "Something went wrong sending your message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ---- NEW: fallbacks so nothing breaks if Strapi fields are empty ----
  const namePlaceholder = data.name_placeholder || "Your name";
  const emailPlaceholder = data.email_placeholder || "Your email";
  const subjectPlaceholder = data.subject_placeholder || "Subject";
  const messagePlaceholder = data.message_placeholder || "How can we help?";
  const submitText = data.submit_button_text || "Send Message";
  const submitLoadingText = data.submit_button_loading_text || "Sending...";

  return (
    <>
      <section
      id="contact"
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
          {data.eyebrow && (
            <span className="inline-block px-4 py-2 rounded-full bg-card border border-border text-muted-foreground text-sm mb-6">
              {data.eyebrow}
            </span>
          )}

          {data.main_title && (
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {data.main_title}
            </h2>
          )}

          {data.description && (
            <div className="max-w-4xl mb-4">
              {renderBlocks(
                data.description,
                "text-lg md:text-xl text-muted-foreground leading-relaxed"
              )}
            </div>
          )}

          {data.cta_text && (
            <p className="text-sm md:text-base text-muted-foreground">
              {data.cta_text}{" "}
              {data.cta_link_url && data.cta_link_label && (
                <>
                  <a
                    href={data.cta_link_url}
                    className="text-primary font-semibold hover:underline"
                  >
                    {data.cta_link_label.trim()}
                  </a>
                  .
                </>
              )}
            </p>
          )}
        </motion.div>

        {/* =================================================
            GET IN TOUCH
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl bg-card border border-border p-8 md:p-10 mb-8"
        >
          {data.get_in_touch_title && (
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              {data.get_in_touch_title}
            </h3>
          )}

          {renderBlocks(data.get_in_touch_details)}
        </motion.div>

        {/* =================================================
            CONTACT FORM
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-card border border-border p-8 md:p-10"
        >
          {data.contact_form_title && (
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              {data.contact_form_title}
            </h3>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={namePlaceholder}
                required
                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={emailPlaceholder}
                required
                className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder={subjectPlaceholder}
              required
              className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder={messagePlaceholder}
              required
              rows={6}
              className="w-full rounded-xl bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            />

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {submitting ? submitLoadingText : submitText}
            </button>

            {submitted && (
              <div className="rounded-xl border border-emerald-800 bg-emerald-950/40 px-4 py-3 text-emerald-400">
                {data.success_message ||
                  "Thank you! Your message has been received. We will get back to you soon."}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-red-400">
                {error}
              </div>
            )}

            {data.form_footer_note && (
              <p className="text-sm text-muted-foreground">
                {data.form_footer_note}
              </p>
            )}
          </form>
        </motion.div>
      </div>
      </section>
      {footerData && <Footer data={footerData} />}
    </>
  );
};

export default ContactSection;