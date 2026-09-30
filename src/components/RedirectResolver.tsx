import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  buildRedirectMap,
  fetchRedirects,
  isCacheFresh,
  readCachedRedirects,
  resolveRedirect,
  type RedirectRule,
} from "@/lib/redirects";

const LOAD_TIMEOUT_MS = 2500;

/**
 * Sits in front of the routes. Loads the redirect list from Strapi (cached for a few minutes),
 * and if the current URL has a redirect, sends the visitor to the new URL instead of rendering routes.
 * If Strapi is slow or down it fails open and just renders the site.
 *
 * Note: this is a browser-side redirect. For real HTTP 301s see `npm run redirects:htaccess`.
 */
const RedirectResolver = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const cached = useMemo(() => readCachedRedirects(), []);
  const [rules, setRules] = useState<RedirectRule[]>(cached?.rules ?? []);
  const [ready, setReady] = useState(Boolean(cached));

  useEffect(() => {
    if (isCacheFresh(cached)) return;

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS);

    fetchRedirects(controller.signal)
      .then(setRules)
      .catch(() => {})
      .finally(() => {
        window.clearTimeout(timer);
        setReady(true);
      });

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [cached]);

  const map = useMemo(() => buildRedirectMap(rules), [rules]);
  const target = useMemo(() => resolveRedirect(location.pathname, map), [location.pathname, map]);

  useEffect(() => {
    if (!target) return;

    if (target.external) {
      window.location.replace(target.destination);
      return;
    }

    // Keep the visitor's query string (utm tags etc.) unless the rule sets its own.
    const destination =
      target.destination.includes("?") || !location.search
        ? target.destination
        : `${target.destination}${location.search}`;
    navigate(destination, { replace: true });
  }, [target, navigate, location.search]);

  if (!ready || target) return null;
  return <>{children}</>;
};

export default RedirectResolver;
