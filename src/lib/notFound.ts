const STRAPI_URL: string = import.meta.env.VITE_STRAPI_URL ?? "";
const reported = new Set<string>();

/**
 * Tells Strapi that a visitor hit a missing URL. Fire-and-forget: it never throws and
 * reports each path at most once per page load (also guards React StrictMode double effects).
 */
export function trackNotFound(pathname: string, referrer = "") {
  if (!STRAPI_URL || !pathname || reported.has(pathname)) return;
  reported.add(pathname);

  try {
    void fetch(`${STRAPI_URL}/api/not-found-logs/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

export const __resetNotFoundTrackingForTests = () => reported.clear();
