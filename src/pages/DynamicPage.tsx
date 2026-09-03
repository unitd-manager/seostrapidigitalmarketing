import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicComponent from "@/pages/DynamicComponent";

import {
  fetchPageBySlug,
  fetchFooter,
  fetchHeader,
} from "@/lib/strapi";

const DynamicPage = () => {
  const { slug } = useParams<{ slug?: string }>();

  // "/" = home
  // "/about" = about
  const pageSlug = slug || "home";

  const [page, setPage] = useState<any>(null);
  const [header, setHeader] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);

        console.log("Loading page with slug:", pageSlug);

        /*
         * --------------------------------------------------
         * LOAD PAGE
         * --------------------------------------------------
         */

        const pageData = await fetchPageBySlug(pageSlug);

        console.log("Page data received:", pageData);

        setPage(pageData);

        /*
         * --------------------------------------------------
         * LOAD HEADER
         * --------------------------------------------------
         *
         * Header failure should NOT break the page.
         */

        try {
          const headerData = await fetchHeader();

          console.log("Header data received:", headerData);

          setHeader(headerData);
        } catch (headerError) {
          console.error(
            "Failed to load header:",
            headerError
          );

          setHeader(null);
        }

        /*
         * --------------------------------------------------
         * LOAD FOOTER
         * --------------------------------------------------
         *
         * Footer failure should NOT break the page.
         */

        try {
          const footerData = await fetchFooter();

          console.log("Footer data received:", footerData);

          setFooter(footerData);
        } catch (footerError) {
          console.error(
            "Failed to load footer:",
            footerError
          );

          setFooter(null);
        }

      } catch (error) {
        console.error(
          "Failed to load dynamic page:",
          error
        );

        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [pageSlug]);

  /*
   * --------------------------------------------------
   * LOADING
   * --------------------------------------------------
   */

  if (loading) {
    return <div>Loading...</div>;
  }

  /*
   * --------------------------------------------------
   * PAGE NOT FOUND
   * --------------------------------------------------
   */

  if (!page) {
    return <div>Page not found</div>;
  }

  /*
   * --------------------------------------------------
   * PAGE BUILDER
   * --------------------------------------------------
   */

  const layouts = page?.pageBuilder || [];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}

      <Header data={header} />

      {/* PAGE BUILDER */}

      <main>
        {layouts.map(
          (layout: any, index: number) => (
            <DynamicComponent
              key={`${layout.__component}-${layout.id || index}`}
              layout={layout}
            />
          )
        )}
      </main>

      {/* FOOTER */}

      <Footer data={footer} />

    </div>
  );
};

export default DynamicPage;