import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { fetchFooter } from "@/lib/strapi";

interface SeoFormField {
  id: number;
  label: string;
  name: string;
  type: "text" | "email" | "url" | "tel";
  placeholder: string;
  required: boolean;
  order: number;
  Publish?: boolean | null;
}

interface SeoAuditFormProps {
  fields: SeoFormField[];
  main_title?: string;
  description?: string;
  success_message?: string;
  error_message?: string;
  submit_label?: string;
  Publish?: boolean | null;
}

const websitePattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

function validatorFor(type: SeoFormField["type"]) {
  if (type === "email") return emailPattern;
  if (type === "url") return websitePattern;
  return null;
}

// Visible unless explicitly set to false (empty/null counts as visible)
const isPublished = (item?: { Publish?: boolean | null } | null) =>
  item?.Publish !== false;

export default function SeoAuditForm({
  fields,
  main_title,
  description,
  success_message,
  error_message,
  submit_label,
  Publish,
}: SeoAuditFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [footerData, setFooterData] = useState<any>(null);

  // Hidden fields are removed here, so they are also skipped by validation
  // and never sent to the API.
  const sorted = [...(fields || [])]
    .filter(isPublished)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Fallbacks in case a field is left blank in Strapi
  const heading = main_title || "Get Your Free SEO Audit Report";
  const subtext =
    description ||
    "Enter your details and we'll send your SEO report within 24 hours.";
  const successText = success_message || "SEO Audit Request Sent Successfully!";
  const errorText = error_message || "Failed to send request.";
  const submitLabel = submit_label || "Get My Report";

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const footer = await fetchFooter();
        setFooterData(footer);
      } catch (footerError) {
        console.error("SeoAuditForm: failed to load footer", footerError);
        setFooterData(null);
      }
    };

    loadFooter();
  }, []);

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    for (const f of sorted) {
      const raw = (values[f.name] || "").trim();

      if (f.required && !raw) {
        alert(`Please fill in ${f.label || f.name}.`);
        return;
      }

      const pattern = validatorFor(f.type);
      const toTest = f.type === "email" ? raw.toLowerCase() : raw;
      if (raw && pattern && !pattern.test(toTest)) {
        alert(`Please enter a valid ${f.label || f.name}.`);
        return;
      }
    }

    setStatus("sending");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/seo-audit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || errorText);
      }

      setStatus("sent");
      setValues({});
    } catch (err) {
      console.error("SEO audit form submit failed:", err);
      setStatus("error");
    }
  }

  // Whole block hidden when its own Publish toggle is false.
  // Placed after all hooks so React's rules of hooks are respected.
  if (!isPublished({ Publish })) return null;

  return (
    <>
      <section className="flex min-h-[calc(100vh-6rem)] items-center justify-center bg-[#0f172a] px-4 py-16">
        <div className="w-full max-w-md rounded-xl bg-[#111827] p-8 shadow-2xl">
          <h2 className="mb-2 text-2xl font-bold text-white">{heading}</h2>
          <p className="mb-6 text-sm text-gray-400">{subtext}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {sorted.map((f) => (
              <input
                key={f.id}
                type={f.type === "url" ? "text" : f.type}
                name={f.name}
                placeholder={f.placeholder || f.label}
                required={f.required}
                value={values[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
                className="w-full rounded-md border-none bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            ))}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mx-auto mt-4 block rounded-md bg-yellow-400 px-6 py-2.5 font-bold text-black transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : submitLabel}
            </button>

            {status === "sent" && (
              <p className="pt-2 text-center text-sm text-green-400">
                {successText}
              </p>
            )}
            {status === "error" && (
              <p className="pt-2 text-center text-sm text-red-400">
                {errorText}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* {footerData && <Footer data={footerData} />} */}
    </>
  );
}