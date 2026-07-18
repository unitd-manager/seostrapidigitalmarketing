import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SkepticismSection from "@/components/SkepticismSection";
import SeoNotaCampaignSection from "@/components/SeoNotaCampaignSection";
import HiddenCostSection from "@/components/HiddenCostSection";
import TimelineSection from "@/components/TimelineSection";
import FrameworkSection from "@/components/FrameworkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VisionSection from "@/components/VisionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FinalCTASection from "@/components/FinalCTASection";
import PricingSection from "@/components/PricingSection";
 
type DynamicComponentProps = {
  layout: any;
};

const DynamicComponent = ({ layout }: DynamicComponentProps) => {
  switch (layout.__component) {

    case "acf-sections.banner-layout":
      return <HeroSection data={layout} />;

    case "acf-sections.industry-highlight-block":
      return <ProblemSection data={layout} />;

    case "acf-sections.industry-ai-use-cases":
      return <SkepticismSection data={layout} />;

    case "acf-sections.common-heading-section":

  switch (layout.template) {

    case "seo_reality":
      return <SeoNotaCampaignSection data={layout} />;

    case "framework":
      return <FrameworkSection data={layout} />;

    case "vision_12_months":
      return <VisionSection data={layout} />;

    default:
      return <SeoNotaCampaignSection data={layout} />;
  }

    case "acf-sections.unmapped-layout":
      return <HiddenCostSection data={layout} />;

    case "acf-sections.grid-layout":
      return <TimelineSection data={layout} />;

    case "acf-sections.home-testimonial-highlight":
      return <TestimonialsSection data={layout} />;

      case "acf-sections.home-key-highlights":
  return <HowItWorksSection data={layout} />;

  case "acf-sections.home-featured-case-study":
  return <PricingSection data={layout} />;

  case "acf-sections.footer-common-cta":
  return <FinalCTASection data={layout} />;

    default:
      console.warn(
        `No frontend template found for: ${layout.__component}`
      );
      return null;
  }
};

export default DynamicComponent;