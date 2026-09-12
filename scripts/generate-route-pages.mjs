import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { renderPage } from "../.prerender/prerender.js";

const dist = "dist";
const sourcePath = join(dist, "index.html");
const source = await readFile(sourcePath, "utf8");

const routes = [
  {
    path: "projets/modern-it-helpdesk-lab",
    title: "Modern IT Helpdesk Lab — Support IT & Microsoft | Irphanoullah",
    description: "Étude de cas d’un laboratoire de support IT moderne : Jira Service Management, Microsoft Entra ID, Intune, Microsoft 365, incidents Windows et documentation.",
    url: "https://irphan.eu/projets/modern-it-helpdesk-lab/",
  },
  {
    path: "projets/nginx-soc-detection-lab",
    title: "Nginx SOC Detection Lab — Blue Team & Wazuh | Irphanoullah",
    description: "Étude de cas Blue Team : exposition contrôlée Nginx, logs JSON, règles Wazuh, corrélation, hardening et tests automatisés de non-régression.",
    url: "https://irphan.eu/projets/nginx-soc-detection-lab/",
  },
  {
    path: "projets/ai-it-support-lab",
    title: "AI IT Support Lab — IA appliquée au support IT | Irphanoullah",
    description: "Étude de cas d’un assistant local pour le support IT : documentation prioritaire, RAG, garde-fous, fallback sûr, tests automatisés et validation humaine.",
    url: "https://irphan.eu/projets/ai-it-support-lab/",
  },
];

function replaceMeta(html, route) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${route.url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${route.url}" />`);
}

for (const route of routes) {
  const directory = join(dist, route.path);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), replaceMeta(source, route).replace('<div id="root"></div>', `<div id="root">${renderPage(route.path)}</div>`));
}

console.log(`Generated ${routes.length} route-specific HTML pages with SEO metadata.`);

await writeFile(sourcePath, source.replace('<div id="root"></div>', `<div id="root">${renderPage("")}</div>`));
