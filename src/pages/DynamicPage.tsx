import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicComponent from "@/pages/DynamicComponent";

import { fetchPageBySlug } from "@/lib/strapi";

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const loadPage = async () => {
      try {
        setLoading(true);

        const pageData = await fetchPageBySlug(slug);

        setPage(pageData);
      } catch (error) {
        console.error("Failed to load dynamic page:", error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!page) {
    return <div>Page not found</div>;
  }

  const layouts = page?.pageBuilder || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        {layouts.map((layout: any, index: number) => (
          <DynamicComponent
            key={`${layout.__component}-${layout.id || index}`}
            layout={layout}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default DynamicPage;