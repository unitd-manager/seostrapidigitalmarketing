import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import DynamicComponent from "@/pages/DynamicComponent";
import NotFound from "@/pages/NotFound"; // adjust path to your 404 page

import { fetchPageBySlug, fetchHeader } from "@/lib/strapi";
import { useSeo } from "@/lib/seo";

const DynamicPage = () => {
  const { slug } = useParams<{ slug?: string }>();

  const pageSlug = slug || "home";

  const [page, setPage] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setLoadFailed(false);

        const pageData = await fetchPageBySlug(pageSlug);
        setPage(pageData);

        try {
          const headerData = await fetchHeader();
          setHeader(headerData);
        } catch (headerError) {
          console.error("Failed to load header:", headerError);
          setHeader(null);
        }
      } catch (error) {
        console.error("Failed to load dynamic page:", error);
        setPage(null);
        // A network / server error is not a 404, do not report it as a missing page.
        setLoadFailed(true);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageSlug]);

  // SEO tags from the CMS (meta, canonical, Open Graph, Twitter, JSON-LD, noindex).
  useSeo(page?.seo, { title: page?.title });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loadFailed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">Something went wrong while loading this page.</p>
          <button className="underline" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  const layouts = (page?.pageBuilder || []).filter(
    (layout: any) => layout.Publish !== false
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header data={header} />

      <main>
        {layouts.map((layout: any, index: number) => (
          <DynamicComponent
            key={`${layout.__component}-${layout.id || index}`}
            layout={layout}
          />
        ))}
      </main>

      {/* Footer single type, shown on every page */}
      <FooterSection />
    </div>
  );
};

export default DynamicPage;