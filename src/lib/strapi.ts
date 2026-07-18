const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;

export const fetchPageBySlug = async (slug: string) => {
  const url =
    `${STRAPI_URL}/api/pages` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}`;

  const response = await fetch(url);

  console.log("fetchPageBySlug: requesting URL:", url);

  if (!response.ok) {
    console.error("fetchPageBySlug: response not ok", response);
    throw new Error(`Failed to fetch page: ${response.status}`);
  }

  const result = await response.json();
  console.log("fetchPageBySlug: result:", result);

  return result?.data?.[0] || null;
};