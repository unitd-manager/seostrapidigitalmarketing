const STRAPI_URL: string = import.meta.env.VITE_STRAPI_URL ?? "";
const CACHE_KEY = "strapi-redirects:v1";
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_HOPS = 10;

export interface RedirectRule {
  source: string;
  destination: string;
  statusCode: 301 | 302 | number;
}

export interface RedirectTarget {
  destination: string;
  external: boolean;
  statusCode: number;
}

const isAbsolute = (value: string) => /^https?:\/\//i.test(value);

export const normalizePath = (raw: string): string => {
  let value = (raw ?? "").trim().split("#")[0].split("?")[0];
  if (!value.startsWith("/")) value = `/${value}`;
  value = value.replace(/\/{2,}/g, "/");
  if (value.length > 1) value = value.replace(/\/+$/, "");
  return value.toLowerCase();
};

export const buildRedirectMap = (rules: RedirectRule[]) => {
  const map = new Map<string, RedirectRule>();
  for (const rule of rules) {
    if (rule?.source && rule?.destination) map.set(normalizePath(rule.source), rule);
  }
  return map;
};

/**
 * Follows the chain (a -> b -> c) to its final destination, with loop protection.
 * Returns null when the path has no redirect.
 */
export const resolveRedirect = (
  pathname: string,
  map: Map<string, RedirectRule>
): RedirectTarget | null => {
  let rule = map.get(normalizePath(pathname));
  if (!rule) return null;

  const seen = new Set<string>([normalizePath(pathname)]);
  let hops = 0;

  while (hops < MAX_HOPS) {
    hops += 1;
    if (isAbsolute(rule.destination)) {
      return { destination: rule.destination, external: true, statusCode: Number(rule.statusCode) };
    }

    const nextKey = normalizePath(rule.destination);
    const next = map.get(nextKey);
    if (!next || seen.has(nextKey)) {
      return { destination: rule.destination, external: false, statusCode: Number(rule.statusCode) };
    }
    seen.add(nextKey);
    rule = next;
  }

  return { destination: rule.destination, external: isAbsolute(rule.destination), statusCode: Number(rule.statusCode) };
};

interface CachedRedirects {
  savedAt: number;
  rules: RedirectRule[];
}

export const readCachedRedirects = (): CachedRedirects | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedRedirects;
    return Array.isArray(parsed?.rules) ? parsed : null;
  } catch {
    return null;
  }
};

export const isCacheFresh = (cached: CachedRedirects | null) =>
  Boolean(cached && Date.now() - cached.savedAt < CACHE_TTL_MS);

export async function fetchRedirects(signal?: AbortSignal): Promise<RedirectRule[]> {
  if (!STRAPI_URL) return [];

  const response = await fetch(`${STRAPI_URL}/api/redirects/lookup`, { signal });
  if (!response.ok) throw new Error(`Failed to load redirects: ${response.status}`);

  const body = await response.json();
  const rules: RedirectRule[] = Array.isArray(body?.data) ? body.data : [];

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), rules }));
  } catch {
    /* storage unavailable, fine */
  }
  return rules;
}
