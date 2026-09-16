import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const dist = new URL("../dist/", import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
const urls = [...sitemap.matchAll(/<loc>(https:\/\/irphan\.eu\/[^<]*)<\/loc>/g)].map((match) => match[1]);
assert(urls.length > 0, "The sitemap contains no irphan.eu URLs.");
assert(new Set(urls).size === urls.length, "The sitemap contains duplicate URLs.");

for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = new URL(`.${pathname}index.html`, dist);
  await access(file);
  const html = await readFile(file, "utf8");
  assert(html.includes(`<link rel="canonical" href="${url}"`), `Missing or incorrect canonical: ${url}`);
  assert(!/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html), `Indexable page contains noindex: ${url}`);
  assert(/<title>[^<]+<\/title>/.test(html), `Missing title: ${url}`);
  assert(/<h1(?:\s[^>]*)?>/.test(html), `Missing H1: ${url}`);
}

const notFound = await readFile(new URL("../dist/404.html", import.meta.url), "utf8");
assert(/name="robots" content="noindex, follow"/.test(notFound), "404 page must be noindex.");
assert(!/rel="canonical"/.test(notFound), "404 page must not declare a canonical URL.");

const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");
assert(headers.includes("Strict-Transport-Security:"), "HSTS header is missing.");
assert(headers.includes("Content-Security-Policy:"), "CSP header is missing.");
assert(!headers.includes("'unsafe-inline'"), "CSP must not allow unsafe inline content.");

async function findSourceMaps(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory.pathname, entry.name);
    if (entry.isDirectory()) return findSourceMaps(new URL(`${entry.name}/`, directory));
    return entry.name.endsWith(".map") ? [path] : [];
  }));
  return nested.flat();
}

const sourceMaps = await findSourceMaps(dist);
assert(sourceMaps.length === 0, `Production source maps detected: ${sourceMaps.join(", ")}`);

console.log(`Validated ${urls.length} indexable pages, the 404 response body, security headers and source-map policy.`);
