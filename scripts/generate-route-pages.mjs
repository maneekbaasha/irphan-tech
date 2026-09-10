import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = "dist";
const sourcePath = join(dist, "index.html");
const source = await readFile(sourcePath, "utf8");

const routes = [
  {
    path: "projets/modern-it-helpdesk-lab",
    title: "Modern IT Helpdesk Lab — Support IT & Microsoft | Irphanoullah",
    description: "Étude de cas d’un laboratoire de support IT moderne : Jira Service Management, Microsoft Entra ID, Intune, Microsoft 365, incidents Windows et documentation.",
    url: "https://irphan.eu/projets/modern-it-helpdesk-lab/",
    image: "https://irphan.eu/og/modern-it-helpdesk-lab.webp",
    imageAlt: "Modern IT Helpdesk Lab — support IT, Entra ID, Intune et troubleshooting",
  },
  {
    path: "projets/nginx-soc-detection-lab",
    title: "Nginx SOC Detection Lab — Blue Team & Wazuh | Irphanoullah",
    description: "Étude de cas Blue Team : exposition contrôlée Nginx, logs JSON, règles Wazuh, corrélation, hardening et tests automatisés de non-régression.",
    url: "https://irphan.eu/projets/nginx-soc-detection-lab/",
    image: "https://irphan.eu/og/nginx-soc-detection-lab.webp",
    imageAlt: "Nginx SOC Detection Lab — Blue Team, Wazuh, Sigma et Docker",
  },
  {
    path: "projets/ai-it-support-lab",
    title: "AI IT Support Lab — IA appliquée au support IT | Irphanoullah",
    description: "Étude de cas d’un assistant local pour le support IT : documentation prioritaire, RAG, garde-fous, fallback sûr, tests automatisés et validation humaine.",
    url: "https://irphan.eu/projets/ai-it-support-lab/",
    image: "https://irphan.eu/og/ai-it-support-lab.webp",
    imageAlt: "AI IT Support Lab — IA locale, RAG et validation humaine pour le support IT",
  },
];

function replaceMeta(html, route) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${route.url}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${route.image}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${route.imageAlt}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${route.image}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${route.url}" />`);
}

for (const route of routes) {
  const directory = join(dist, route.path);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), replaceMeta(source, route));
}

console.log(`Generated ${routes.length} route-specific HTML pages with SEO and social metadata.`);
