import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getCaseStudyBySlug from "@/lib/case-study-api";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import NotFound from "@/pages/NotFound"; // adjust path to your 404 page
import type { CaseStudy } from "@/types/case-study";
import { useSeo } from "@/lib/seo";

/**
 * Add a matching route in your router setup, e.g. in App.tsx:
 *   <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
 */
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null | undefined>(undefined); // undefined = loading
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      // No slug in the URL, so there is nothing to load: show 404
      setCaseStudy(null);
      return;
    }

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

  // SEO tags from the CMS; falls back to the case study title until/unless SEO is filled in.
  useSeo(caseStudy?.seo, { title: caseStudy?.title, description: caseStudy?.hero_description as string | undefined });

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

  // Unpublished or nonexistent: the API returns no entry, so show the 404 page
  if (caseStudy === null) {
    return <NotFound />;
  }

  return <CaseStudyDetail caseStudy={caseStudy} />;
}