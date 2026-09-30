/**
 * Writes real HTTP 301/302 redirects (from Strapi -> Redirect) into public/.htaccess.
 * The React router can only redirect inside the browser; this makes Apache do it, which is
 * what search engines see. Run before each deploy:   npm run redirects:htaccess
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const envFile = path.join(root, ".env");
let strapiUrl = process.env.VITE_STRAPI_URL;
if (!strapiUrl && fs.existsSync(envFile)) {
  strapiUrl = fs.readFileSync(envFile, "utf8").match(/^VITE_STRAPI_URL=(.+)$/m)?.[1]?.trim();
}
if (!strapiUrl) throw new Error("VITE_STRAPI_URL is not set.");

const BEGIN = "# BEGIN STRAPI REDIRECTS";
const END = "# END STRAPI REDIRECTS";
const target = path.join(root, "public", ".htaccess");

const response = await fetch(`${strapiUrl.replace(/\/$/, "")}/api/redirects/lookup`);
if (!response.ok) throw new Error(`Lookup failed: ${response.status}`);
const { data = [] } = await response.json();

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const lines = data
  .filter((rule) => rule.source && rule.destination)
  .map((rule) => {
    const from = escapeRegex(rule.source.replace(/^\/+/, "").replace(/\/+$/, ""));
    const code = rule.statusCode === 302 ? 302 : 301;
    return `  RewriteRule ^${from}/?$ ${rule.destination} [R=${code},L,NC,QSA]`;
  });

const block = [BEGIN, "  # generated, do not edit by hand", ...lines, END].join("\n");

let htaccess = fs.readFileSync(target, "utf8").replace(/\r\n/g, "\n");
const existing = new RegExp(`${BEGIN}[\\s\\S]*?${END}`);

if (existing.test(htaccess)) {
  htaccess = htaccess.replace(existing, block);
} else {
  htaccess = htaccess.replace(/(RewriteBase \/\n)/, `$1\n${block}\n`);
}

fs.writeFileSync(target, htaccess);
console.log(`Wrote ${lines.length} redirect rule(s) to public/.htaccess`);
