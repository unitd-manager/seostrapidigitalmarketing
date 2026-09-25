// Types matching the "Case Study" content type shown in the Strapi admin.
// Field names are inferred from the admin screenshot — rename anything here
// to match your actual attribute names if they differ (Content-Type Builder
// → Case Study → each field's "Name").

export type StrapiBlockChild = {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  url?: string;
  children?: StrapiBlockChild[];
};

export type StrapiBlock = {
  type: "paragraph" | "heading" | "list" | "quote" | "code" | string;
  level?: number; // heading level
  format?: "ordered" | "unordered"; // list format
  children: StrapiBlockChild[];
};

// A rich-text (Blocks) field comes back as StrapiBlock[]; a plain textarea
// comes back as a string. Components below accept either.
export type RichText = StrapiBlock[] | string;

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface HeroStat {
  id: number;
  value: string;
  label: string;
}

export interface OverviewPoint {
  id: number;
  text: string;
}

export interface TagEntry {
  id: number;
  text: string;
}

export interface ChallengeItem {
  id: number;
  number: string;
  title: string;
  short_text?: string; // collapsed preview line; falls back to a trimmed description
  description: RichText;
  tags?: TagEntry[]; // optional pill list inside the expanded card (e.g. "Technical SEO Limitations")
}

export interface StrategyPhase {
  id: number;
  phase_label: string; // "Phase 1"
  phase_title: string;
  intro: RichText;
  description?: string;
  items_label?: string; // "Key Improvements Included"
  items?: TagEntry[]; // the pill/tag list
  closing_text?: string;
  default_active?: boolean;
}

export interface IResultStat {
  id: number;
  value?: string;
  label?: string;
  heading?: string;
  sub_heading?: string;
  description?: string;
  expanded_content?: RichText;
  badge_label?: string;
  badge_text?: string;
  closing_text?: string;
}

export interface ResultItem {
  id: number;
  value1?: string; // "187%"
  label1?: string; // "Growth in Organic Traffic"
  description?: string; // collapsed summary
  expanded_content?: RichText; // shown when "View More" is opened
  badge_label?: string; // "Result"
  badge_text?: string; // "187% Increase in Organic Traffic"
  closing_text?: string;
  heading?: string;
  sub_heading?: string;
}

export interface WhySectionItem {
  id: number;
  text: string;
}
export interface KeyResultStat {
  id: number;
  value: string;
  label: string;
}
export interface CaseStudy {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  client?: string;
  industry?: string;
  featuredImage?: StrapiMedia | null;

  eyebrow?: string;
  hero_label?: string; // "Organic Growth" eyebrow tag
  hero_title: string;
  hero_highlight_word?: string;
  hero_highlight_title?: string; // substring of hero_title to render with the gradient highlight
  hero_description?: string;
  hero_stats: HeroStat[];

  overview_title?: string;
  overview_points: OverviewPoint[];

  challenge_title?: string;
  challenge_intro?: string;
  challenge_items: ChallengeItem[];

  strategy_title?: string;
  strategy_intro?: string;
  strategy_phases: StrategyPhase[];

  results_title?: string;
  results_intro?: string;
  results_items?: ResultItem[];
  results_stats?: IResultStat[];

  why_worked_title?: string;
  why_worked_intro?: string;
  why_worked_points?: WhySectionItem[];
  why_worked_closing?: string;
  why_section_title?: string;
  why_section_intro?: string;
  why_section_items?: WhySectionItem[];
  why_section_closing?: string;

  looking_ahead_title?: string;
  looking_ahead_content?: RichText;
  closing_title?: string; // "Looking Ahead"
  closing_content?: RichText;

  conclusion_title?: string;
  conclusion_content?: RichText;
  key_results_title?: string;
  key_results_stats?: KeyResultStat[];
  key_results_highlight_heading?: string;
  key_results_highlight_label?: string;
  services_provided?: string;
  agency?: string;
  campaign_focus?: string;
}

// Shape of a Strapi v5 REST collection response for this content type.
export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}