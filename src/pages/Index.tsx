import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SkepticismSection from "@/components/SkepticismSection";
import SeoNotaCampaignSection from "@/components/SeoNotaCampaignSection";
import TimelineSection from "@/components/TimelineSection";
import FrameworkSection from "@/components/FrameworkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VisionSection from "@/components/VisionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import HiddenCostSection from "@/components/HiddenCostSection";
import PricingSection from "@/components/PricingSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { fetchPageBySlug } from "@/lib/strapi";

type PageLayout = {
  __component?: string;
  template?: string;
  [key: string]: unknown;
};

const Index = () => {
  const location = useLocation();
  const [page, setPage] = useState<{ pageBuilder?: PageLayout[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomePage = async () => {
      try {
        setLoading(true);
        setError(null);

        const pageData = await fetchPageBySlug("home");
        setPage(pageData);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
        setPage(null);
        setError("Unable to load homepage content right now.");
      } finally {
        setLoading(false);
      }
    };

    loadHomePage();
  }, []);

  const layouts = page?.pageBuilder || [];

  console.log("Index.tsx: page data:", page);
  console.log("Index.tsx: layouts:", layouts);

  const getLayout = useMemo(
    () => (componentName: string, predicate?: (layout: PageLayout) => boolean) => {
      const found = layouts.find(
        (layout) =>
          layout.__component === componentName &&
          (!predicate || predicate(layout)),
      );
      console.log(`Index.tsx: looking for ${componentName}, found:`, found);
      return found;
    },
    [layouts],
  );

  const heroLayout = getLayout("acf-sections.banner-layout");
  const problemLayout = getLayout("acf-sections.industry-highlight-block");
  const skepticismLayout = getLayout("acf-sections.industry-ai-use-cases");
  const seoRealityLayout = getLayout(
    "acf-sections.common-heading-section",
    (layout) => layout.template === "seo_reality",
  );
  const hiddenCostLayout = getLayout("acf-sections.unmapped-layout");
  const timelineLayout = getLayout("acf-sections.grid-layout");
  const frameworkLayout = getLayout(
    "acf-sections.common-heading-section",
    (layout) => layout.template === "framework",
  );
  const testimonialsLayout = getLayout("acf-sections.home-testimonial-highlight");
  const visionLayout = getLayout(
    "acf-sections.common-heading-section",
    (layout) => layout.template === "vision_12_months",
  );
  const howItWorksLayout = getLayout("acf-sections.home-key-highlights");
  const pricingLayout = getLayout("acf-sections.package-card-section") || getLayout("acf-sections.home-featured-case-study");
  const finalCtaLayout = getLayout("acf-sections.footer-common-cta");

  useEffect(() => {
    if (location.hash !== "#pricing") return;

    if (loading) return;

    // Wait one frame so sections are painted before scrolling.
    requestAnimationFrame(() => {
      const section = document.getElementById("pricing");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, loading]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {loading ? (
          <div className="section-container py-24 text-center text-muted-foreground">
            Loading...
          </div>
        ) : error ? (
          <div className="section-container py-24 text-center text-muted-foreground">
            {error}
          </div>
        ) : (
          <>
            {heroLayout && <HeroSection data={heroLayout} />}
            {problemLayout && <ProblemSection data={problemLayout} />}
            {skepticismLayout && <SkepticismSection data={skepticismLayout} />}
            {seoRealityLayout && <SeoNotaCampaignSection data={seoRealityLayout} />}
            {hiddenCostLayout && <HiddenCostSection data={hiddenCostLayout} />}
            {timelineLayout && <TimelineSection data={timelineLayout} />}
            {frameworkLayout && <FrameworkSection data={frameworkLayout} />}
            {testimonialsLayout && <TestimonialsSection data={testimonialsLayout} />}
            <CaseStudiesSection />
            {visionLayout && <VisionSection data={visionLayout} />}
            {howItWorksLayout && <HowItWorksSection data={howItWorksLayout} />}
            {pricingLayout && (
              <PricingSection
                data={{
                  ...pricingLayout,
                  pricing_cards: (pricingLayout.package_cards || pricingLayout.pricing_cards || []).map((card: any, i: number) => {
                    // Check if it's the old format (title/subtitle) or new (package_title/package_subtitle)
                    const isOldFormat = !!card.title;
                    return {
                      title: isOldFormat ? card.title : card.package_title,
                      subtitle: isOldFormat ? card.subtitle : card.package_subtitle,
                      price: isOldFormat ? card.price : card.price,
                      duration: isOldFormat ? card.duration : card.price_plan,
                      // For the other fields, let's add defaults
                      theme: i === 1 ? "orange" : "blue", // Make the middle one popular
                      badge: i === 1 ? "Most Popular" : undefined,
                      icon: ["zap", "trending-up", "crown"][i] || "zap",
                      feature_list: (card.feature_list || card.features || []).map((f: any) => ({ title: f.title || f.package_title || "" })),
                      priceId: isOldFormat ? card.title : card.package_title,
                    };
                  }),
                }}
              />
            )}
            {finalCtaLayout && <FinalCTASection data={finalCtaLayout} />}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
