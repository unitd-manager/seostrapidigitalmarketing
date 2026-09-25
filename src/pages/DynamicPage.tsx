import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "@/components/Header";
import DynamicComponent from "@/pages/DynamicComponent";

import {
  fetchPageBySlug,
  fetchHeader,
} from "@/lib/strapi";

const DynamicPage = () => {
  const { slug } = useParams<{ slug?: string }>();

  const pageSlug = slug || "home";

  const [page, setPage] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);

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
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageSlug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!page) {
    return <div>Page not found</div>;
  }

  const layouts = page?.pageBuilder || [];

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
    </div>
  );
};

export default DynamicPage;