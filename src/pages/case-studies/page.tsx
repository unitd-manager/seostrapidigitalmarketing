import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getCaseStudyBySlug from "@/lib/case-study-api";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import type { CaseStudy } from "@/types/case-study";

/**
 * Add a matching route in your router setup, e.g. in App.tsx:
 *   <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
 */
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null | undefined>(undefined); // undefined = loading
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setCaseStudy(undefined);
    setError(null);

    getCaseStudyBySlug({ slug })
      .then((data) => {
        if (!cancelled) setCaseStudy(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load case study.");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (caseStudy === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (caseStudy === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <p className="text-muted-foreground">Case study not found.</p>
      </div>
    );
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}